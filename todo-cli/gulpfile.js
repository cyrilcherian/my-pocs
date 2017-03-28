// Include gulp
var gulp = require('gulp');
 // Include plugins
var concat = require('gulp-concat');
var strip = require('gulp-strip-comments');
const shell = require('gulp-shell');
var gulpSequence = require('gulp-sequence');
var gzip = require('gulp-gzip');
 
 // Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src('dist/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/build/js'));
});
 // Concat Task
gulp.task('concat', ['scripts']);

gulp.task('remove-comments', function () {
  return gulp.src('dist/*.js')
    .pipe(strip())
    .pipe(gulp.dest('dist'));
});
gulp.task('make', shell.task([
  'ng build --prod --aot=true'
]))
gulp.task('gzip', function () {
    return gulp.src(['dist/*.js'])
        .pipe(gzip())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulpSequence(['make'], ['remove-comments'], ['gzip']));