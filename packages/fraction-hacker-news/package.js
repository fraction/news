'use strict';

Package.describe({
  summary: "Hacker News"
});

Npm.depends({
  "hacker-news-api" : "1.1.6"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('fraction-es6', both);
  api.use('fraction-posts', 'server');

  api.add_files('namespace.js');
  api.add_files('lib/read.next.js', 'server');
});
