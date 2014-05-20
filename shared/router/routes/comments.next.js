'use strict';

var depend = ['posts', 'controllers'];

define('routeComments', depend, (Posts, Controllers) => {
  return {
    name: 'comments',
    controller: Controllers.page,
    path: '/comments/:id',
    template: 'listPosts',
    waitOn: () => {
      return Meteor.subscribe('comments', this.params.id);
    },
    onAfterAction: () => {
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
});
