Router.route('comments', {
  path: '/comments/:id',
  template: 'listPosts',
  waitOn: function () {
    return Meteor.subscribe('comments', this.params.id);
  },
  onAfterAction: function () {
    Session.set('posts', Posts.find({
      _id: this.params.id
    }, {
      reactive: false
    }).fetch());
    Session.set('currentView', 'Comments');
    Session.set('sortType', null);
  }
});
