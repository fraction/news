'use strict';

Package.describe({
  summary: "Twitter"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('fraction-es6', 'server');
  api.use('fraction-collections', 'server');

  api.add_files('lib/tweetHot.next.js', 'server');
});
