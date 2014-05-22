'use strict';

Package.describe({
  summary: "Posts"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('fraction-es6', both);
  api.use('fraction-utilities', 'client');

  api.use('standard-app-packages', both);
  api.use('less', 'client');

  api.add_files('namespace.js', both);

  api.add_files('lib/publish.next.js', 'server');
  api.add_files('lib/setHeat.next.js', 'server');

  var views = [
    'listPosts.html',
    'listPosts.less',
    'viewPost.html',
    'viewPost.less',
    'viewPost.next.js',
    'sort.html',
    'sort.less',
    'sort.next.js'
  ];

  views.forEach(function (view) {
    api.add_files('views/' + view, 'client');
  });

  api.export('Posts', both);
});
