/* jshint node: true */
"use strict";

var gulp        = require('gulp'),
    es          = require('event-stream'),
    clean       = require('gulp-rimraf'),
    compass     = require('gulp-compass'),
    concat      = require('gulp-concat'),
    //debug       = require('gulp-debug'),
    inject      = require('gulp-inject'),
    jshint      = require('gulp-jshint'),
    runSequence = require('run-sequence'),
    stylish     = require('jshint-stylish'),
    chalk       = require('chalk');

// TODO: Make a map structure for these
var js_deps = ['deps/jquery/jquery-1.11.1.min.js',
               'deps/bootstrap-sass/assets/javascripts/bootstrap.js'];

// If true, then we generate a production build output
var isProduction = false;

gulp.task('gen_html', function() {
   // XXX: there is an ordering issue here with the deps
   return gulp.src(['build/js_deps/jquery*.js',
                    'build/js_deps/*.js', 
                    'build/*.js', 
                    'build/*.css'], 
                   {read: false})
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
   // Build and install application scripts and dependency scripts
   var app_stream = gulp.src('src/js/**/*.js')
           .pipe(concat('test_app.js'))
           .pipe(gulp.dest('build'));
   var lib_stream = gulp.src(js_deps)
           .pipe(gulp.dest('build/js_deps'));

   return es.merge(app_stream, lib_stream);
});

gulp.task('style', function() {
   return gulp.src('src/scss/*.scss')
              .pipe(compass({
                css: 'build',
                sass: 'src/scss',
                time: true,
                style: (isProduction? 'compressed' : 'nested'),
                comments: !isProduction,
                import_path: ['deps/bootstrap-sass/assets/stylesheets']
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

