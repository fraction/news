Handlebars.registerHelper('activeTime', function(time) {
  if (Session.equals('sortTime', time)) {
    return 'active';
  } else {
    return null;
  }
});

Handlebars.registerHelper('activeSort', function(sort) {
  if (Session.equals('sortType', sort)) {
    console.log(sort);
    return 'active';
  } else {
    return 'inactive';
  }
});

Handlebars.registerHelper('toCapital', function(str) {
  if (typeof str === 'string' && str.length > 0)
    return str.charAt(0).toUpperCase() + str.slice(1);
});

Template.sort.helpers({
  'isSortTop' : function () {
    if (Session.equals('sortType', 'top')) {
      return true;
    } else {
      return false;
    }
  },
  'sortType' : function () {
    return Session.get('sortType');
  },
  sortTime : function () {
    return Session.get('sortTime');
  }
});
