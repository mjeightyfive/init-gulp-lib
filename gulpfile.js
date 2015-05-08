'use strict';

var gulp = require('gulp'),
    del = require('del'),
    $ = require('gulp-load-plugins')(),
    sequence = require('run-sequence'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

var major = $.util.env.major || false;
var minor = $.util.env.minor || false;
var patch = $.util.env.patch || false;

if (!major && !minor) {
    patch = true;
}

function handleError(err) {
    console.log(err.toString());
}

gulp.task('clean', del.bind(null, ['./dist']));

gulp.task('default', ['clean'], function() {
    sequence('scripts', 'jshint', 'test');
});

gulp.task('release', ['clean'], function() {
    sequence('scripts', 'jshint', 'test', 'bump');
});

gulp.task('scripts', function() {
    gulp.src('./src/*.js')
        .pipe(gulp.dest('./dist'))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('jshint', function() {
    return gulp.src('./src/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
    gulp.src('./tests/*.html')
        .pipe(mochaPhantomJS())
        .on('error', handleError)
        .emit('end');
});

gulp.task('bump', function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe($.
            if (major, $.bump({
                type: 'major'
            })))
        .pipe($.
            if (minor, $.bump({
                type: 'minor'
            })))
        .pipe($.
            if (patch, $.bump({
                type: 'patch'
            })))
        .pipe(gulp.dest('./'));
});