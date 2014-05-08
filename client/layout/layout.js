Handlebars.registerHelper('session', function(input) {
  "use strict";
  return Session.get(input);
});

var levels = ['success', 'info', 'warning', 'danger'];

var createAlert = function (level) {
  "use strict";
  Handlebars.registerHelper(level, function(title, msg) {
    var str = '<strong>' + title + '</strong> ' + msg;
    return '<div class="alert alert-' + level + '">' + str + '</div>';
  });
};

levels.forEach(createAlert);
