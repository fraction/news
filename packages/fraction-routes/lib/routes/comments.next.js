'use strict';

Routes.comments = {
  name: 'comments',
  controller: Routes.Controllers.page,
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

    Session.set('showComments', true);
    Session.set('currentView', 'Comments');
    Session.set('sortType', null);
  }
};
