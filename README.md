Installation
------------
> npm install
> gem install --pre compass


Capabilities
------------

App:
 - DONE: Phase 1
   - Simple page with some basic interaction
   - gulp: hmtl copy, clean, concat, jshint, css gen, html template gen
 - DONE: Phase 2
   - Use bootstrap (SASS) for styling
   - gulp: compass extensions
 - Phase 3
   - browserify
   - Use browserify with commonjs way of getting deps
   - get in jquery and bootstrap (external or included?)
   - check debugging (source maps??)
 - Phase 4
   - JS code spread across multiple directories
   - gulp: concat, watch, uglify, dev vs prod
 - Phase 5
   - Incremental builds (do less work)
 - Phase 6
   - test specs to come in
   - gulp: karma, coverage, ci, debugging
 - Phase 7
   - multiple pages to get loaded (index.html, other.html, etc)
     - separate source for each
     - separate css deps for each (maybe)
   - gulp: multiple "apps"
 - Phase 8
   - angular support for interaction and doing stuff (add item to page from text box)
   - gulp: angular deps, angular ui, angular bootstrap


Todo:
- jshint
  - only check changed files
- module support: browserify
  - app js code
  - deps ???
  - get deps ordering correct
    - idea: use concat on deps libraries in correct order
            and then modules for the apps files.
- uglification
- Incremental builds
   - watch everything
   - only build / run what is needed
- use karma for testing
  - Use phantomjs and or chrome
  - reporter for ci testing
  - coverage reporting (istanbul?)
- debugging build
  - source maps
- bringing in multiple deps trees (including css and prod/dev js files)
- multiple "apps" coming from same dependencies
- live reloading of application (syncing)
- Angular
  - manage deps for angular with npm or other?
  - angular ui
  - angular ui bootstrap



Done:
- clean


Questions: 
  - App structure
    - should js, spec, and html be separate?
      - could break out into common and apps?
      - could use naming to get spec separate from js files.

Notes:
  - To debug: ./node_modules/.bin/node-debug ./node_modules/.bin/gulp

