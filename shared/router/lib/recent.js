Route.recent = {
  controller: 'NewsController',
  path:     '/recent',
  template: 'listPosts',
  waitOn: function () {
    "use strict";
    return Meteor.subscribe('recentPosts');
  },
  onAfterAction: function () {
    "use strict";

    setNewsSession('recent');
    Session.set('posts', Posts.find({}, {
      reactive: false,
      sort: {
        createdAt: -1
      }
    }).fetch());
  }
};
