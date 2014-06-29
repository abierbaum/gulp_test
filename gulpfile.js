/* jshint node: true */
"use strict";

var gulp        = require('gulp'),
    clean       = require('gulp-rimraf'),
    compass     = require('gulp-compass'),
    concat      = require('gulp-concat'),
    //debug       = require('gulp-debug'),
    inject      = require('gulp-inject'),
    jshint      = require('gulp-jshint'),
    runSequence = require('run-sequence'),
    stylish     = require('jshint-stylish'),
    chalk       = require('chalk');

// If true, then we generate a production build output
var isProduction = false;

gulp.task('gen_html', function() {
   return gulp.src(['build/*.js', 'build/*.css'], {read: false})
              //.pipe(debug({title: 'html_inject'}))
              .pipe(inject('src/index.html',
                 { 
                    ignorePath: 'build/',
                    addRootSlash: false
                 }
              ))
              .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
   return gulp.src('build', {read: false})
          .pipe(clean());
});

gulp.task('scripts', function() {
   return gulp.src('src/js/**/*.js')
              .pipe(concat('test_app.js'))
              .pipe(gulp.dest('build'));
});

gulp.task('style', function() {
   return gulp.src('src/scss/*.scss')
              .pipe(compass({
                css: 'build',
                sass: 'src/scss',
                time: true,
                style: (isProduction? 'compressed' : 'nested'),
                comments: !isProduction
              }))
              .pipe(gulp.dest('build'));
});

gulp.task('lint', function() {
   return gulp.src(['src/js/**/*.js',
                    'gulpfile.js'])
              .pipe(jshint('jshintrc'))
              .pipe(jshint.reporter(stylish))
              .pipe(jshint.reporter('fail'));
});


gulp.task('build', function(cb) {
   console.log(chalk.blue.bold('Starting build type: ') + 
               chalk.green.bold( (isProduction ? 'PRODUCTION' : 'DEV') ));
   
   runSequence('lint',
               'clean',
               'scripts',
               'style',
               'gen_html',
               cb);
});


/** Primary Use Cases
*  - Run as developer on local system
*  - Run to generate a production output
*  - Run to get test output in autobuild for testing
*/
gulp.task('production', function(cb) {
   isProduction = true;
   runSequence('build',
               cb);
});

gulp.task('default', ['build']);

