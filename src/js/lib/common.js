/**
* Common methods here
*/
/* exported printStuff */
var _ = require('lodash'),
    b1 = require('./big1.js'),
    b2 = require('./big2.js'),
    b3 = require('./big3.js');

module.exports = {

   printStuff: function() {
      console.log('some stuff here');

      var print_it = false;
      if(print_it) {
         console.log(b1, b2, b3);
      }

      _.delay(function() {
         console.log('more stuff');
      }, 500);
   }
};
