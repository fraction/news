Handlebars.registerHelper('session', function(input) {
  "use strict";
  return Session.get(input);
});

var createAlert = function (level) {
  UI.registerHelper(level, function(title, msg) {
    "use strict";
    var str = '<strong>' + title + '</strong> ' + msg;
    return '<div class="alert alert-' + level + '">' + str + '</div>';
  });
}

createAlert('success');
createAlert('info');
createAlert('warning');
createAlert('danger');
