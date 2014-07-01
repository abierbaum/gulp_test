/* bundleLogger
   ------------
   Provides gulp style logs to the bundle method in browserify.js
*/

var gutil        = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime;

function BundleLogger(name) {
   if (!(this instanceof BundleLogger)) { 
      return new BundleLogger(name); 
   }
   this.name      = name;
   this.startTime = null;
}

BundleLogger.prototype.start = function() {
   this.startTime = process.hrtime();
   gutil.log('Running', gutil.colors.green("'bundle' - " + this.name) + '...');
}

BundleLogger.prototype.end = function() {
	var taskTime = process.hrtime(this.startTime);
	var prettyTime = prettyHrtime(taskTime);
	gutil.log('Finished', gutil.colors.green("'bundle' - " + this.name), ' in', gutil.colors.magenta(prettyTime));
}

module.exports = BundleLogger;
