'use strict';

Package.describe({
  summary: "Define Fraction collections"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.add_files('namespace.js', both);
  api.add_files('collections.js', both);

  api.export(['Posts', 'Votes'], both);
});
