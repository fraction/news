'use strict';

Package.describe({
  summary: "Post Heat"
});

Package.on_use(function (api) {
  api.use('fraction-es6', 'server');
  api.use('fraction-posts', 'server');

  api.add_files('lib/set.next.js', 'server');
});
