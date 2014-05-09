hotRoute = {
  controller: 'PageController',
  path:     '/hot',
  template: 'listPosts',
  waitOn: function () {
    "use strict";
    return Meteor.subscribe('hotPosts');
  },
  onAfterAction: function () {
    "use strict";

    Session.set('showComments', false);
    Session.set('sortType', 'hot');
    Session.set('currentView', 'Hot News');
    Session.set('posts', Posts.find({}, {
      reactive: false,
      sort: {
        heat: -1
      }
    }).fetch());
  }
};
