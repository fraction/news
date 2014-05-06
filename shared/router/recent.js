Router.route('recent', {
  path:     '/recent',
  template: 'listPosts',
  waitOn: function () {
    return Meteor.subscribe('recentPosts');
  },
  onAfterAction: function () {
    Session.set('sortType', 'recent');
    Session.set('currentView', 'Recent News');
    Session.set('posts', Posts.find({}, {
      reactive: false,
      sort: {
        createdAt: -1
      }
    }).fetch());
  }
});
