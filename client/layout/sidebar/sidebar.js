Handlebars.registerHelper('activeTime', function(time) {
  "use strict";

  if (Session.equals('sortTime', time)) {
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
    return Session.get('sortType');
  },
  'showBack' : function () {
    "use strict";

    // only show a back button on comment/user pages, where sortType is unset
    if (Session.equals('sortType', null)) {
      return true;
    } else {
      return false;
    }
  },
  'backLink' : function () {
    "use strict";
    return '/';
  }
});
