'use strict';

var traceur = Npm.require('traceur');

Plugin.registerSourceHandler("next.js", function (compileStep) {
  var oldPath = compileStep.inputPath;
  var newPath = oldPath.replace(/\.next\.js$/, '.now.js');

  var options = {
    filename: oldPath,
    sourceMap: true
  };
  var content = compileStep.read().toString('utf8');
  var output = traceur.compile(content, options);

  if (output.error) {
    throw new Error(output.error);
  }

  var removeModule = function (str) {
    return str.replace("module.exports", "es6");
  };

  compileStep.addJavaScript({
    sourcePath: oldPath,
    path: newPath,
    data: removeModule(output.js),
    sourceMap: output.sourceMap
  });
});
