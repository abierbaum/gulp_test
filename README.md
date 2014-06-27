Just random testing of gulp.  Ignore.

App:
 - Phase 1
   - Simple page with some basic interaction
   - Use bootstrap (SASS) for styling
   - gulp: concat, css gen, html template gen, clean, jshint
 - Phase 2
   - JS code spread across multiple directories
   - gulp: concat, modules, watch, uglify, dev vs prod
 - Phase 3
   - test specs to come in
   - gulp: karma, coverage, ci, debugging
 - Phase 4
   - multiple pages to get loaded (index.html, other.html, etc)
     - separate source for each
     - separate css deps for each (maybe)
   - gulp: multiple "apps"
 - Phase 5
   - angular support for interaction and doing stuff (add item to page from text box)
   - gulp: angular deps, angular ui, angular bootstrap


Todo:
- jshint
  - conifguration file for jshint
- put js and css into html template for index.html
- concat of files
- clean
- module support
  - browserfy ?
- uglification
- compass for css
  - output style vary by production vs dev
  - import paths
- watch everything
- use karma for testing
  - Use phantomjs and or chrome
  - reporter for ci testing
  - coverage reporting (istanbul?)
- debugging build
  - source maps
- bringing in multiple deps trees (including css and prod/dev js files)
- copy files into correct locations ??
- multiple "apps" coming from same dependencies
- Angular
  - manage deps for angular with npm or other?
  - angular ui
  - angular ui bootstrap

