'use strict';

Package.describe({
  summary: "Twitter"
});

Npm.depends({
  "twit" : "1.1.15"
});

Package.on_use(function (api) {
  api.use('fraction-es6', 'server');
  api.use('fraction-posts', 'server');

  api.add_files('lib/tweetHot.next.js', 'server');
});
