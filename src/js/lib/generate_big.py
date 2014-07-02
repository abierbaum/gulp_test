num_items = 100

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

for fname in ['big1.js', 'big2.js', 'big3.js']:
   open(fname, 'w').write(full_text)

