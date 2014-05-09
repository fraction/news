userRoute = {
  path: '/user/:username',
  template: 'listPosts',
  waitOn: function () {
    "use strict";
    return Meteor.subscribe('user', this.params.username);
  },
  data: function () {
    "use strict";

    Session.set('currentView', 'Profile');
    Session.set('back', Session.get('sortType'));
    Session.set('sortType', null);
    Session.set('posts', Posts.find({
      author: this.params.username
    }, {
      reactive: false
    }).fetch());
  }
};
