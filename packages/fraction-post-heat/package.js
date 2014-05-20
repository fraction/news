'use strict';

Package.describe({
  summary: "Read Hacker News"
});

Npm.depends({
  "hacker-news-api" : "1.1.4"
});

Package.on_use(function (api) {
  api.use('harmony', 'server');
  api.use('fraction-collections', 'server');

  api.add_files('lib/set.next.js', 'server');
});
