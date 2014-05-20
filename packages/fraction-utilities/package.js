'use strict';

Package.describe({
  summary: "Utilities"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('fraction-es6', both);
  api.use('standard-app-packages');

  api.add_files('namespace.js', both);
  api.add_files('lib/shuffle.next.js', both);
  api.add_files('lib/alerts.next.js', 'client');
  api.add_files('lib/session.next.js', 'client');

  api.export('Utilities', both);
});
