const gulp = require('gulp');
const tsc = require('gulp-typescript');
const tsProject = tsc.createProject('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');

const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config.babel");

// タスクの定義
gulp.task("webpack", () => {
    // ☆ webpackStreamの第2引数にwebpackを渡す☆
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('public'));
});

const browserSync = require('browser-sync');

/** Run Web server */
gulp.task('serve', ['webpack'], () => {
    return browserSync.init(null, {
        logLevel: "debug",
        open: true,
        port: 3000,
        online: false,
        ui: false,
        server: {
            baseDir: 'public/'
        },
        reloadDelay: 1000
    })
});

gulp.task('default', ['serve']);