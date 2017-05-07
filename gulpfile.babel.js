const gulp = require('gulp');
const tsc = require('gulp-typescript');
const tsProject = tsc.createProject('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.babel");
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task("webpack", ['sass'], () => {
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('public'));
});

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