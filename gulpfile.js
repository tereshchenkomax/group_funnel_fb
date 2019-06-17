const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webpack = require('webpack');
const gutil = require('gulp-util');
const notifier = require('node-notifier');

gulp.task('front', function () {
  return gulp.src([
    "./src/front/**/*.js"
  ])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('front:prod', function (cb) {
  return gulp.src([
    "./src/front/**/*.js"
  ])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('background', function () {
  return gulp.src([
    "./src/background/**/*.js"
  ])
    .pipe(concat('background.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('background:prod', function (cb) {
  return gulp.src([
    "./src/background/**/*.js"
  ])
    .pipe(concat('background.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});


let webpackPopupConfig = require('./webpack.popup.config');
let webpackOptionsConfig = require('./webpack.option.config');
let webpackDataListConfig = require('./webpack.data-list.config');
let statsLog = { // для красивых логов в консоли
  colors: true,
  reasons: true
};

gulp.task('webpack:data-list', (done) => {
  // run webpack
  webpack(webpackDataListConfig, onComplete);

  function onComplete(error, stats) {
    if (error) { // кажется еще не сталкивался с этой ошибкой
      onError(error);
    } else if (stats.hasErrors()) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
      onError(stats.toString(statsLog));
    } else {
      onSuccess(stats.toString(statsLog));
    }
  }

  function onError(error) {
    let formatedError = new gutil.PluginError('webpack', error);
    notifier.notify({ // чисто чтобы сразу узнать об ошибке
      title: `Error: ${formatedError.plugin}`,
      message: formatedError.message
    });
    done(formatedError);
  }

  function onSuccess(detailInfo) {
    gutil.log('[webpack]', detailInfo);
    done();
  }
});

gulp.task('webpack:popup', (done) => {
  // run webpack
  webpack(webpackPopupConfig, onComplete);

  function onComplete(error, stats) {
    if (error) { // кажется еще не сталкивался с этой ошибкой
      onError(error);
    } else if (stats.hasErrors()) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
      onError(stats.toString(statsLog));
    } else {
      onSuccess(stats.toString(statsLog));
    }
  }

  function onError(error) {
    let formatedError = new gutil.PluginError('webpack', error);
    notifier.notify({ // чисто чтобы сразу узнать об ошибке
      title: `Error: ${formatedError.plugin}`,
      message: formatedError.message
    });
    done(formatedError);
  }

  function onSuccess(detailInfo) {
    gutil.log('[webpack]', detailInfo);
    done();
  }
});

gulp.task('webpack:options', (done) => {
  // run webpack
  webpack(webpackOptionsConfig, onComplete);

  function onComplete(error, stats) {
    if (error) { // кажется еще не сталкивался с этой ошибкой
      onError(error);
    } else if (stats.hasErrors()) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
      onError(stats.toString(statsLog));
    } else {
      onSuccess(stats.toString(statsLog));
    }
  }

  function onError(error) {
    let formatedError = new gutil.PluginError('webpack', error);
    notifier.notify({ // чисто чтобы сразу узнать об ошибке
      title: `Error: ${formatedError.plugin}`,
      message: formatedError.message
    });
    done(formatedError);
  }

  function onSuccess(detailInfo) {
    gutil.log('[webpack]', detailInfo);
    done();
  }
});

gulp.task('watch', function () {
  gulp.watch(['./src/background/**/*.js'], gulp.series('background'));
  gulp.watch(['./src/front/**/*.js'], gulp.series('front'));
  gulp.watch(['./src/data-list/**/*.js'], gulp.series('webpack:data-list'));
  gulp.watch(['./src/popup/**/*.js'], gulp.series('webpack:popup'));
  gulp.watch(['./src/options/**/*.js'], gulp.series('webpack:options'));
});

gulp.task('prod', gulp.series('front:prod'));

gulp.task('default', gulp.series('front', 'background', 'webpack:data-list', 'webpack:popup', 'webpack:options', 'watch'));
