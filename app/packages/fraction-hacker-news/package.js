'use strict';

Package.describe({
  summary: "Hacker News"
});

Npm.depends({
  "hacker-news-api" : "1.3.1"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('harmony');
  api.use('fraction-posts', 'server');

  api.add_files('namespace.js');
  api.add_files('lib/read.next.js', 'server');
});
