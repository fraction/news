commentsRoute = {
  path: '/comments/:id',
  template: 'listPosts',
  waitOn: function () {
    "use strict";
    return Meteor.subscribe('comments', this.params.id);
  },
  onAfterAction: function () {
    "use strict";

    Session.set('posts', Posts.find({
      _id: this.params.id
    }, {
      reactive: false
    }).fetch());

    Session.set('showComments', true);
    Session.set('currentView', 'Comments');
    Session.set('sortType', null);
  }
};
