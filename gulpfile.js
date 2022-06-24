'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
// var sourcemaps = require('gulp-sourcemaps');

// Compile sass into CSS & auto-inject into browsers with autoprefixer
gulp.task('sass', function () {
  return gulp
    .src(['template/scss/**/*.scss'])
    // .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    // .pipe(sourcemaps.write('../css'))
    .pipe(gulp.dest("template/css"))
    .pipe(browserSync.stream());
});

// Static Server
gulp.task('serve', function (done) {
  browserSync.init({
    server: "./template"
  });
  done();
});

// watching scss/html files
gulp.task('watch', function (done) {
  gulp.watch(['template/scss/**/*.scss'], gulp.series('sass'));
  gulp.watch("template/*.html").on('change', browserSync.reload);
  done();
});


// default task
gulp.task('default', gulp.series(gulp.parallel('sass'), gulp.parallel('serve', 'watch')));











