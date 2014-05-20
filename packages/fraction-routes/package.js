'use strict';

Package.describe({
  summary: "Routes"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('fraction-es6', both);
  api.use('fraction-utilities', both);
  api.use('iron-router', both);

  api.add_files('namespace.js');

  api.add_files('lib/setNews.next.js');
  api.add_files('lib/controllers.next.js');

  var routes = [
    'comments',
    'default',
    'hot',
    'random',
    'recent',
    'root',
    'top',
    'user'
  ];

  // add each route
  routes.forEach(function (route) {
    api.add_files('lib/routes/' + route + '.next.js', both);
  });

  api.add_files('lib/config.next.js');
});
