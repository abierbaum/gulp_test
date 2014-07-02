num_items = 10000

function_blocks = ["""
   blah_%s: function() {
      var junk = 10, other = 5;
      console.log('blah' + junk + other);
   }""" % num for num in range(num_items)]

full_text = """
module.exports = {
   %s
};
""" % ",".join(function_blocks)

open('big.js', 'w').write(full_text)

