'use strict';

Template.main.helpers({
  'currentView' : function () {
    return Session.get('currentView');
  }
});
