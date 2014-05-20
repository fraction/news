'use strict';

Package.describe({
  summary: "Votes"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.add_files('namespace.js', both);

  api.export('Votes', both);
});
