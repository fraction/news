/* global recentRoute:true */

recentRoute = {
  path:     '/recent',
  template: 'listPosts',
  waitOn: function () {
    "use strict";
    return Meteor.subscribe('recentPosts');
  },
  onAfterAction: function () {
    "use strict";

    Session.set('sortType', 'recent');
    Session.set('currentView', 'Recent News');
    Session.set('posts', Posts.find({}, {
      reactive: false,
      sort: {
        createdAt: -1
      }
    }).fetch());
  }
};
