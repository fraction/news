'use strict';

Package.describe({
  summary: "Votes"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('harmony');
  api.use('fraction-posts', both);
  api.use('standard-app-packages', both);

  api.add_files('namespace.js', both);

  api.add_files('lib/count.next.js', 'server');
  api.add_files('lib/publish.next.js', 'server');
  api.add_files('lib/methods.next.js', 'server');

  api.export('Votes', both);
});
