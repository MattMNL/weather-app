(function() {
  'use strict';

  var gulp = require('gulp'); // Base gulp package
  var bower = require('gulp-bower'); // Bower front-end package management
  var browserSync = require('browser-sync').create(); // BrowserSync for browser refresh when required
  var reload = browserSync.reload; // Reload func of BrowserSync
  var imagemin = require('gulp-imagemin'); // Image minification and optimization
  var changed = require('gulp-changed'); // Filters src to only pass changed files
  var sass = require('gulp-sass'); // Sass compatibility package
  var minifyCSS = require('gulp-minify-css'); // CSS minification
  var autoprefixer = require('gulp-autoprefixer'); // CSS autoprefixer
  var rename = require('gulp-rename'); // Package for renaming files
  var concat = require('gulp-concat'); // File concatenation
  var uglify = require('gulp-uglify'); // JS uglify package
  var jshint = require('gulp-jshint'); // JSHint package for error logging
  var plumber = require('gulp-plumber'); // Plumber keeps gulp running after CSS/JS errors
  var gutil = require('gulp-util'); // Utility functions for gulp plugins
  var spawn = require('child_process').spawn; // Gulp process management

  // Browser sync task
  gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: './',
      },
      logLevel: 'debug',
    });
    gulp.watch(['*.html', 'templates/**/*.html']).on('change', reload);
  });

  // All tasks related to styles
  gulp.task('sass', function() {
    return gulp
      .src('scss/main.scss')
      .pipe(changed('build'))
      .pipe(plumber())
      .pipe(sass({
        style: 'compressed'
      }))
      .on('error', function(err) {
        gutil.log(err);
        this.emit('end');
      })
      .pipe(autoprefixer())
      .pipe(minifyCSS())
      .pipe(concat('app.min.css'))
      .pipe(gulp.dest('build'))
      .pipe(reload({
        stream: true
      }));
  });

  // All tasks related to JS
  // Set uglify to mangle: false to avoid problems with angular code
  gulp.task('script', function() {
    return gulp
      .src([
        'bower_components/angular/angular.min.js',
        'bower_components/angular-resource/angular-resource.min.js',
        'js/app.js',
        // 'js/filters/*.js',
        'js/services/*.js',
        'js/factories/*.js',
        'js/components/*.js',
        'js/controllers/*.js'
      ])
      .pipe(changed('build'))
      .pipe(plumber())
      .pipe(jshint())
      .pipe(concat('app.min.js'))
      /* .pipe(uglify({mangle: false})) */
      .on('error', function(err) {
        gutil.log(err);
        this.emit('end');
      })
      .pipe(gulp.dest('build'))
      .pipe(reload({
        stream: true
      }));
  });

  // Image compression task
  gulp.task('image', function() {
    return gulp
      .src('assets/img/*')
      .pipe(imagemin({
        optimizationLevel: 5
      }))
      .pipe(gulp.dest('assets/img'));
  });

  // Setup reload gulp task on gulpfile.js change
  gulp.task('auto-reload', function() {
    var process;

    function restart() {
      if (process) {
        process.kill();
      }

      process = spawn('gulp', ['default'], {
        stdio: 'inherit'
      });
    }

    gulp.watch('gulpfile.js', restart);
    restart();
  });

  // Bower task for getting front-end package dependencies
  gulp.task('bower', function() {
    return bower()
      .pipe(gulp.dest('bower_lib/'));
  });

  // Watch tasks
  gulp.task('watch', function() {
    gulp.watch('scss/**/*', ['sass']);
    gulp.watch('js/**/*', ['script']).on('change', reload);
  });

  // Default gulp run tasks
  gulp.task('default', ['sass', 'script', 'image', 'browser-sync', 'watch']);
})();
