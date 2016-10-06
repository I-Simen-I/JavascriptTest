'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let styleDestination = "./Web/resources/";

gulp.task('sass', () => {
    return gulp.src(styleDestination + '*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(styleDestination));
});

gulp.task('sass:watch', () => {
    gulp.watch(styleDestination + '*.scss', ['sass']);
});