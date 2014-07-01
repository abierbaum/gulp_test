/**
* Common methods here
*/
/* exported printStuff */
var _ = require('lodash');

module.exports = {

   printStuff: function() {
      console.log('stuff');
      _.delay(function() {
         console.log('more stuff');
      }, 500);
   }
};
