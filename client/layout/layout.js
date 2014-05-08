Handlebars.registerHelper('session', function(input) {
  "use strict";
  return Session.get(input);
});

var createAlert = function (level) {
	"use strict";
	Handlebars.registerHelper(level, function(title, msg) {
		var str = '<strong>' + title + '</strong> ' + msg;
    return '<div class="alert alert-' + level + '">' + str + '</div>';
  });
};

createAlert('success');
createAlert('info');
createAlert('warning');
createAlert('danger');
