var gulp = require('gulp'),
    notify = require('gulp-notify'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('test', function() {
    return gulp.src('./tests/*.html')
        .pipe(mochaPhantomJS())
        .on('error', handleError);
});