'use strict';

Package.describe({
  summary: "Posts"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('fraction-es6');

  api.add_files('namespace.js', both);
  api.add_files('lib/methods.next.js', 'server');
  api.add_files('lib/publish.next.js', 'server');

  api.export('Posts', both);
});
