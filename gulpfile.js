const gulp              = require('gulp');
const concat            = require('gulp-concat');
const uglify            = require('gulp-uglify');
const webpack           = require('webpack');
const gutil             = require('gulp-util');
const notifier          = require('node-notifier');

gulp.task('front', function () {
  return gulp.src([
        "./src/front/**/*.js"
    ])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('front:prod', function(cb) {
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

gulp.task('background:prod', function(cb) {
    return gulp.src([
        "./src/background/**/*.js"
    ])
    .pipe(concat('background.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});


let webpackConfig = require('./webpack.config.js');
let statsLog      = { // для красивых логов в консоли
  colors: true,
  reasons: true
};
gulp.task('webpack', (done) => {
  // run webpack
  webpack(webpackConfig, onComplete);
  function onComplete(error, stats) {
    if (error) { // кажется еще не сталкивался с этой ошибкой
      onError(error);
    } else if ( stats.hasErrors() ) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
      onError( stats.toString(statsLog) );
    } else {
      onSuccess( stats.toString(statsLog) );
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

gulp.task('watch', function() {
    gulp.watch(['./src/background/**/*.js'], gulp.series('background'));
    gulp.watch(['./src/front/**/*.js'], gulp.series('front'));
    gulp.watch(['./src/data-list/**/*.js'], gulp.series('webpack'));
});

gulp.task('prod', gulp.series('front:prod'));

gulp.task('default', gulp.series('front', 'background', 'webpack', 'watch'));
