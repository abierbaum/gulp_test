/* jshint node: true */
"use strict";

//process.env.BROWSERIFYSHIM_DIAGNOSTICS=1;

var gulp        = require('gulp'),

    //es          = require('event-stream'),
    clean       = require('gulp-rimraf'),
    compass     = require('gulp-compass'),
    //concat      = require('gulp-concat'),
    //debug       = require('gulp-debug'),
    inject      = require('gulp-inject'),
    jshint      = require('gulp-jshint'),
    util        = require('gulp-util'),

    runSequence = require('run-sequence'),
    source      = require('vinyl-source-stream'),

    browserify  = require('browserify'),
    watchify    = require('watchify'),
    stylish     = require('jshint-stylish'),
    chalk       = require('chalk'),
    _           = require('lodash');

// TODO: Make a map structure for these
//var js_deps = ['deps/jquery/jquery-1.11.1.min.js',
//               'deps/bootstrap-sass/assets/javascripts/bootstrap.js'];

// If true, then we generate a production build output
var isProduction = false;

gulp.task('gen_html', function() {
   // XXX: there is an ordering issue here with the deps
   return gulp.src(['build/lib_deps.js',
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
   // Build up a browserify stream of all the files
   var bundleLogger = require('./gulp_helpers/bundleLogger'),
       app_logger   = _.bindAll(bundleLogger('app.js')),
       //lib_logger   = _.bindAll(bundleLogger('lib_deps.js')),
       using_watch  = false,
       bundleMethod = using_watch ? watchify : browserify;

   // --- Bundle Application Files --- //
   // Setup the bundler to run
   var app_bundler = bundleMethod({
      entries: ['./src/js/app.js']
   });
   /*
   // list of dependencies (using their require() names)
   var deps = ['bootstrap', 'jquery'];
   _.forEach(deps, function(dep) {
      app_bundler.external(dep);
   });
   */

   var app_bundle = function() {
      app_logger.start();    // log the start of bundling

      return app_bundler.bundle({ debug: !isProduction })
                    // report compile errors (note: may be issue here)
                    .on('error', util.log)
                    .pipe(source('app.js'))
                    .pipe(gulp.dest('build'))
                    .on('end', app_logger.end);
   };

   // rebundle with watchify on changes
   if(using_watch) {
      app_bundler.on('update', app_bundle);
   }

   return app_bundle();

   // --- Bundle Deps Library Files --- //
   // TODO: Get this working
   //   see:
   //     - https://github.com/thlorenz/browserify-shim/issues/40
   //     - https://github.com/ryan-kimber/multi-browserify
   //  next step: create example repo of exact problem and send issue report/request
   /*
   var lib_bundler = bundleMethod({});
   _.forEach(deps, function(dep) {
      lib_bundler.require(dep);
   });

   var lib_bundle = function() {
      lib_logger.start();
      return lib_bundler.bundle({ debug: !isProduction })
                        .on('error', util.log)
                        .pipe(source('lib_deps.js'))
                        .pipe(gulp.dest('build'))
                        .on('end', lib_logger.end);
   };
   if(using_watch) {
      lib_bundler.on('update', lib_bundle);
   }
   
   // return both streams merged
   return es.merge(app_bundle(), lib_bundle());
   */
   
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



