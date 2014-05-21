'use strict';

Package.describe({
  summary: "Layout",
});

Package.on_use(function(api) {
  var both = ['client', 'server'];

  api.use('fraction-es6', both);
  api.use('less', 'client');
  api.use('standard-app-packages', both);

  api.add_files('vendor/bootstrap.less', 'client');
  api.add_files('vendor/font-awesome.css', 'client');

  var views = [
    'footer.html',
    'footer.less',
    'main.html',
    'sidebar.html',
    'sidebar.less',
    'sidebar.next.js',
    'sort.html',
    'sort.less',
    'sort.next.js',
    'layout.html',
    'layout.less'
  ];

  views.forEach(function (view) {
    api.add_files('views/' + view, 'client');
  });
});
