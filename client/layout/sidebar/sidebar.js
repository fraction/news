'use strict';

Template.sidebar.helpers({
  'showBack' : function () {
    // only show a back button on comment/user pages, where sortType is unset
    if (Session.equals('sortType', null)) {
      return true;
    } else {
      return false;
    }
  },
  'backLink' : function () {
    return '/';
  }
});

Template.sidebar.events({
  'click .sort.active' : function (event) {
    // don't try changing pages
    event.preventDefault();
    require('routes', function (Routes) {
      // run the onAfterAction for the sort type
      Routes[Session.get('sortType')].onAfterAction();
    });
  }
});
