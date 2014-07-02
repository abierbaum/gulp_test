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
 - DONE: Phase 3
   - browserify
   - Use browserify with commonjs way of getting deps
   - get in jquery and bootstrap (external or included?)
   - check debugging (source maps??)
 - DONE: Phase 4
   - Production build
   - gulp: uglify, dev vs prod
 - DONE: Phase 5
   - Incremental builds (do less work)
   - watch, changed, etc
   - browserify changes
   - scss, js file build, html files, linting
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

 - Future
   - Browserify into lib and app bundles

Todo:
- Fix up node_modules setup to work cross-platform (and better)
- module support: browserify
  - app js code
  - deps ???
  - get deps ordering correct
    - idea: use concat on deps libraries in correct order
            and then modules for the apps files.
- use karma for testing
  - Use phantomjs and or chrome
  - reporter for ci testing
  - coverage reporting (istanbul?)
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

