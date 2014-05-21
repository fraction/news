'use strict';

Template.sidebar.helpers({
  showBack : () => {
    // only show a back button on comment/user pages, where sortType is unset
    if (Session.equals('sortType', null)) {
      return true;
    } else {
      return false;
    }
  },
  backLink : () => {
    return '/';
  }
});

Template.sidebar.events({
  'click .sort.active' : (event) => {
    // don't try changing pages
    event.preventDefault();
    require('routes', (Routes) => {
      // run the onAfterAction for the sort type
      Routes[Session.get('sortType')].onAfterAction();
    });
  }
});
