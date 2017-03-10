"use strict";

const gulp = require('gulp');
const htmlMin = require('gulp-htmlmin');
const replace = require('gulp-batch-replace');
const shell = require('gulp-shell');
const strip = require('gulp-strip-comments');

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
  'rm -fr dist',
  'mv dist0/dist .',
  'rm -fr dist0'
]));

gulp.task('make-prod', ['build-prod'], function () {
  return gulp.src('dist/*.js', { base: "./" })
    .pipe(strip())
    .pipe(gulp.dest('.'));
});

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
  'cp karma.conf.js dist0',
  'cp package.json dist0',
  'cp protractor.conf.js dist0',
  'cp tsconfig.json dist0',
  'cp tslint.json dist0',
  'cp -r .angular-cli.json dist0',
  'cp -r .editorconfig dist0'
]));
