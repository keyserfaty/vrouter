var gulp = require('gulp')

var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')

var livereload = require('gulp-livereload')
var connect = require('gulp-connect')

var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var merge = require('utils-merge')

var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')

/* nicer browserify errors */
var gutil = require('gulp-util')
var chalk = require('chalk')

var paths = {
  entry: 'src/app.js',
  dest: 'dist',
  scripts: 'src/**/*.js'
}

function mapError (err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name) +
      ': ' +
      chalk.yellow(err.fileName.replace(__dirname + '/src/js/', '')) +
      ': ' +
      'Line ' +
      chalk.magenta(err.lineNumber) +
      ' & ' +
      'Column ' +
      chalk.magenta(err.columnNumber || err.column) +
      ': ' +
      chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name) +
      ': ' +
      chalk.yellow(err.message))
  }

  this.end()
}
/* */

gulp.task('watchify', function () {
  var args = merge(watchify.args, { debug: true })
  var bundler = watchify(browserify(paths.entry, args)).transform(babelify, { /* opts */ })
  bundleJs(bundler)

  connect.server({
    port: 8000,
    root: 'dist'
  })

  livereload.listen(35729)

  bundler.on('update', function () {
    console.log('update event')

    bundleJs(bundler)
  })
})

function bundleJs (bundler) {
  return bundler.bundle()
    .on('error', mapError)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.dest))
    .pipe(rename('app.min.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    // capture sourcemaps from transforms
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest))
}

// Without watchify
gulp.task('browserify', function () {
  var bundler = browserify(paths.entry, { debug: true }).transform(babelify, {/* options */ })

  return bundleJs(bundler)
})

// Without sourcemaps
gulp.task('browserify-production', function () {
  var bundler = browserify(paths.entry).transform(babelify, {/* options */ })

  return bundler.bundle()
    .on('error', mapError)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest))
})
