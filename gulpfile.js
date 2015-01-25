'use strict';

var gulp = require('gulp'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

function handleError(err) {
    console.log(err.toString());
}

gulp.task('clean', del.bind(null, ['./dist']));

gulp.task('default', ['clean'], function() {
    gulp.start('scripts', 'jshint', 'test');
});

gulp.task('scripts', function() {
    gulp.src('./src/*.js')
        .pipe(gulp.dest('./dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('jshint', function() {
    return gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
    gulp.src('./tests/*.html')
        .pipe(mochaPhantomJS())
        .on('error', handleError)
        .emit('end');
});