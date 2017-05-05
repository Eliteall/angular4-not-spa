const gulp = require('gulp');
const tsc = require('gulp-typescript');
const tsProject = tsc.createProject('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');

/** Compile TypeScript sources */
gulp.task('compile', () => {
    return gulp.src('./src/scripts/**/*ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/scripts'));
});

/** Copy sass */
gulp.task('sass', ['compile'], () => {
    return gulp.src('./src/css/**/*')
        .pipe(gulp.dest('build/css'));
});

const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config.babel");

// タスクの定義
gulp.task("webpack", ['sass'], () => {
    // ☆ webpackStreamの第2引数にwebpackを渡す☆
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('public'));
});

const browserSync = require('browser-sync');
 
/** Run Web server */
gulp.task('serve', ['webpack'], () => {
    return browserSync.init(null, {
        server: {
            baseDir: 'public/'
        },
        reloadDelay: 1000
    })
});

gulp.task('default', ['serve']);