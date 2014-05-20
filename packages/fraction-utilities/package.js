'use strict';

Package.describe({
  summary: "Utilities"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('fraction-es6', both);

  api.add_files('namespace.js', both);
  api.add_files('lib/shuffle.next.js', both);

  api.export('Utilities', both);
});
