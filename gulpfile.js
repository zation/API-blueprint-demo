'use strict';

var gulp = require('gulp');
var aglio = require('gulp-aglio');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var continuousConcat = require('gulp-continuous-concat');

gulp.task('document', function() {
  return gulp.src(['documents/API.md', 'documents/*.md'])
    .pipe(watch('documents/*.md'))
    .pipe(continuousConcat('API.md'))
    .pipe(aglio({template: 'default', filename: './.tmp/index.html'}))
    .pipe(gulp.dest('./.tmp/'))
    .pipe(connect.reload());
});

gulp.task('server', function() {
  return connect.server({
    root: ['./.tmp'],
    port: 3456,
    livereload: {
      port: 35728
    }
  });
});

var gopen = require('gulp-open');

gulp.task('open', function() {
  return gulp.src('./gulpfile.js')
    .pipe(gopen('', {
      url: 'http://localhost:3456'
    }));
});

gulp.task('default', ['server', 'document', 'open']);