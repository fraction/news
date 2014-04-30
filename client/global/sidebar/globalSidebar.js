Handlebars.registerHelper('activeTime', function(time) {
  "use strict";

  if (Session.equals('topTime', time)) {
    return 'active';
  } else {
    return null;
  }
});


Handlebars.registerHelper('activeSort', function(sort) {
  "use strict";

  if (Session.equals('sortType', sort)) {
    return 'active';
  } else {
    return 'inactive';
  }
});

Template.sidebar.helpers({
  'isSortTop' : function () {
    "use strict";

    if (Session.equals('sortType', 'top')) {
      return true;
    } else {
      return false;
    }
  },
  'sortType' : function () {
    "use strict";
    
    return Session.get('sortType').toLowerCase();
  }
});
