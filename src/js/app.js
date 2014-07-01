var common = require('lib/common'),
    $ = require('jquery'),
    bs = require('bootstrap');

app = {
   run: function() {
      console.log('Starting');
      common.printStuff();

      console.log(bs);
      console.log($('body'));

      $('.jquery_status').text("jquery is working");
   }
};

// Start the application
app.run();
