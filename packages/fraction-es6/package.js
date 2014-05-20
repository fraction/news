'use strict';

Package.describe({
  summary: "JavaScript.next-to-JavaScript-of-today compiler",
  version: "0.0.42"
});

Package._transitional_registerBuildPlugin({
  name: "harmony-compiler",
  use: [],
  sources: [
    "plugin/compiler.js"
  ],
  npmDependencies: {"traceur": "0.0.42"}
});

Package.on_use(function(api, where) {
  where = where || ['client', 'server'];

  var path = '.npm/plugin/harmony-compiler/node_modules/traceur/bin/';
  api.add_files(path + 'traceur-runtime.js', where);
});

// Package.on_test(function (api) {
//   api.use(["harmony", "tinytest"]);
//   api.add_files("tests/test.js", ["client"]);
//   api.add_files([
//   ], ["client", "server"]);
// });
