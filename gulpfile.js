const gulp = require('gulp');
const tsc = require('gulp-typescript');
const tsProject = tsc.createProject('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');

/** Compile TypeScript sources */
gulp.task('script:compile', () => {
    return gulp.src('src/script/**/*ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'));
});

const browserSync = require('browser-sync');

/** Run Web server */
gulp.task('serve', () => {
    return browserSync.init(null, {
        server: {
            baseDir: 'public/'
        },
        reloadDelay: 1000
    })
});

const source = require('vinyl-source-stream');
const browserify = require('browserify');
const watchify = require('watchify');

/** Bundle JavaScript sources by Watchify */
gulp.task('script:bundle', () => {
    const b = browserify({
        cache: {},
        packageCache: {},
        debug: true
    });
    const w = watchify(b);
    w.add('build/main.js');
    const bundle = () => {
        return w.bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('public/assets/scripts'))
            .pipe(browserSync.reload({
                stream: true
            }));
    };
    w.on('update', bundle);
    return bundle();
});

const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

// タスクの定義
gulp.task("default", () => {
    // ☆ webpackStreamの第2引数にwebpackを渡す☆
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('dist'));
});