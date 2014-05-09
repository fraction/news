Route.random = {
  controller: 'NewsController',
  path:     '/random',
  template: 'listPosts',
  waitOn: function () {
    "use strict";
    return Meteor.subscribe('recentPosts');
  },
  onAfterAction: function () {
    "use strict";

    setNewsSession('random');
    Session.set('posts', shuffle(Posts.find({}, {
      reactive: false
    }).fetch()));
  }
};
