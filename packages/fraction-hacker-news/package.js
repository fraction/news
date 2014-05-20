'use strict';

Package.describe({
  summary: "Hacker News"
});

Npm.depends({
  "hacker-news-api" : "1.1.5"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('harmony', both);
  api.use('fraction-collections', 'server');

  api.add_files('lib/read.next.js', 'server');
  api.export('HackerNews', ['server', 'client']);
});
