Template.layout.helpers({
  'currentView' : function () {
    "use strict";
    return Session.get('currentView');
  }
});

Handlebars.registerHelper('session', function(input) {
  "use strict";
  return Session.get(input);
});
