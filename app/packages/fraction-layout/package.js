'use strict';

Package.describe({
  summary: "Layout",
});

Package.on_use(function(api) {
  var both = ['client', 'server'];

  api.use('harmony');
  api.use('less', 'client');
  api.use('standard-app-packages', both);

  api.add_files('vendor/bootstrap.less', 'client');
  api.add_files('vendor/font-awesome.css', 'client');

  var views = [
    'main.html',
    'main.less',
    'sidebar.html',
    'sidebar.less',
    'sidebar.next.js',
    'layout.html',
    'layout.less',
    'empty.html'
  ];

  views.forEach(function (view) {
    api.add_files('views/' + view, 'client');
  });
});
