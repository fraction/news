'use strict';

Handlebars.registerHelper('activeTime', (time) => {
  if (Session.equals('sortTime', time)) {
    return 'active';
  } else {
    return null;
  }
});

Handlebars.registerHelper('activeSort', (sort) => {
  if (Session.equals('sortType', sort)) {
    return 'active';
  } else {
    return 'inactive';
  }
});

Handlebars.registerHelper('toCapital', (str) => {
  if (typeof str === 'string' && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});

Template.sort.helpers({
  isSortTop : () => {
    if (Session.equals('sortType', 'top')) {
      return true;
    } else {
      return false;
    }
  },
  sortType : () => {
    return Session.get('sortType');
  },
  sortTime : () => {
    return Session.get('sortTime');
  }
});
