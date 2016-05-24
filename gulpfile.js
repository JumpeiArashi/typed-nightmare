'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const path = require('path');
const espowerTypescript = require('espower-typescript/guess');

const root = path.resolve(__dirname);

gulp.task('build', function() {
  return gulp.src([`${root}/src/**/*.ts`])
    .pipe(webpack(require(`${root}/webpack.config.js`)))
    .pipe(gulp.dest(`${root}/dist/`))
});

gulp.task('test', ['build'], function() {
  return gulp.src([`${root}/test/helpers.ts`, `${root}/test/spec/**/*.ts`])
    .pipe(mocha({
      timeout: 20000,
      require: ['intelli-espower-loader'],
      compilers: {
        ts: espowerTypescript
      }
    }))
});

gulp.task('e2e', ['build'], function() {
  return gulp.src([`${root}/test/helpers.ts`, `${root}/test/e2e/**/*.ts`])
    .pipe(mocha({
      timeout: 60000,
      require: ['intelli-espower-loader'],
      compilers: {
        ts: espowerTypescript
      }
    }))
});

gulp.task('watch', function() {
  gulp.watch([`${root}/src/**/*.ts`, `${root}/test/spec/**/*.js`], ['test'])
});
