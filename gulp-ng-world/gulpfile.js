"use strict";

var gulp = require('gulp');
var htmlMin = require('gulp-htmlmin');
var replace = require('gulp-batch-replace');
const shell = require('gulp-shell')

gulp.task('replace', ['backup'], function(done) {
    var json = require('./replacements.json');
    return gulp.src('dist0/src/**/*.html', { base: "./" })
        .pipe(replace(json.replacements))
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('build-prod', ['replace'], shell.task([
  '(cd dist0;ng build --prod --aot=false;cd ..;)',
  'mv dist0/dist dist',
  'rm -fr dist0'
]));

gulp.task('build-dev', ['devReplace'], shell.task([
  '(cd dist0;ng serve --prod;)'
]));

gulp.task('backup', shell.task([
  'rm -rf dist0',
  'mkdir dist0',
  'ln -s $PWD/e2e dist0/e2e',
  'cp -r  src dist0',
  'ln -s $PWD/node_modules dist0/node_modules',
  'cp *.*  dist0',
  'cp -r .[a-zA-Z0-9]* dist0'
]));
