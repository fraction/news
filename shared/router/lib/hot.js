hotRoute = {
  controller: 'NewsController',
  path:     '/hot',
  template: 'listPosts',
  waitOn: function () {
    "use strict";
    return Meteor.subscribe('hotPosts');
  },
  onAfterAction: function () {
    "use strict";

    setNewsSession('hot');
    Session.set('posts', Posts.find({}, {
      reactive: false,
      sort: {
        heat: -1
      }
    }).fetch());
  }
};
