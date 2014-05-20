'use strict';

Package.describe({
  summary: "Posts"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('fraction-es6', both);
  api.use('standard-app-packages', both);
  api.use('less', 'client');

  api.add_files('namespace.js', both);

  api.add_files('lib/methods.next.js', 'server');
  api.add_files('lib/publish.next.js', 'server');

  var views = [
    'users/viewUser.html',
    'createPost.html',
    'createPost.next.js',
    'listPosts.html',
    'listPosts.less',
    'viewPost.html',
    'viewPost.less',
    'viewPost.next.js'
  ];

  views.forEach(function (view) {
    api.add_files('views/' + view, 'client');
  });

  api.export('Posts', both);
});
