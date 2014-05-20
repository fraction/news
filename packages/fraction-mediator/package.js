'use strict';

Package.describe({
  summary: "Mediator"
});

Package.on_use(function (api) {
  var both = ['client', 'server'];

  api.use('iron-router-progress', 'client');
  api.use('less', 'client');

  api.add_files('iron-router-progress/config.js', 'client');
  api.add_files('iron-router-progress/config.less', 'client');
});
