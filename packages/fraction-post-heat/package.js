'use strict';

Package.describe({
  summary: "Read Hacker News"
});

Npm.depends({
  "hacker-news-api" : "1.1.4"
});

Package.on_use(function (api) {
  api.use('fraction-collections', 'server');

  api.add_files('namespace.js', 'server');
  api.add_files('readHn.js', 'server');
  api.export('ReadHn', ['server', 'client']);
});
