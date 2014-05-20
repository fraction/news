'use strict';

Package.describe({
  summary: "Layout",
});

Package.on_use(function(api) {
  var both = ['client', 'server'];

  api.use('fraction-es6', both);
  api.use('less', 'client');
  api.use('standard-app-packages', both);

  var views = [
    'vendor/bootstrap.less',
    'vendor/font-awesome.css',
    'footer/footer.html',
    'footer/footer.less',
    'main/main.html',
    'sidebar/sidebar.html',
    'sidebar/sidebar.less',
    'sidebar/sidebar.next.js',
    'sort/sort.html',
    'sort/sort.less',
    'sort/sort.next.js',
    'layout.html',
    'layout.less'
  ];

  views.forEach(function (view) {
    api.add_files(view, 'client');
  });
});
