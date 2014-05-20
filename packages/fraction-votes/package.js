'use strict';

Package.describe({
  summary: "Votes"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('fraction-posts', both);

  api.add_files('namespace.js', both);

  api.add_files('lib/count.next.js');
  api.add_files('lib/publish.next.js');
  api.add_files('lib/methods.next.js');

  api.export('Votes', both);
});
