'use strict';

Package.describe({
  summary: "Comments",
});

Package.on_use(function(api) {
  var both = ['client', 'server'];

  api.use('fraction-es6');
  api.use('standard-app-packages', both);
  api.use('less', 'client');
  api.use('fraction-utilities', both);

  var views = [
    'listComments.html',
    'listComments.less',
    'viewComment.html',
    'viewComment.less',
    'viewComment.next.js'
  ];

  views.forEach(function (view) {
    api.add_files('views/' + view, 'client');
  });

});
