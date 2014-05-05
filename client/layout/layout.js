Handlebars.registerHelper('session', function(input) {
  "use strict";
  return Session.get(input);
});
