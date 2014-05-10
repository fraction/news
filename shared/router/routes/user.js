'use strict';

var depend = ['posts', 'controllers'];

define('routeUser', depend, function (Posts, Controllers) {
  return {
    name: 'user',
    controller: Controllers.page,
    path: '/user/:username',
    template: 'listPosts',
    waitOn: function () {
      return Meteor.subscribe('user', this.params.username);
    },
    data: function () {
      Session.set('sortType', null);
      Session.set('currentView', 'Profile');
      Session.set('showComments', false);
      Session.set('back', Session.get('sortType'));

      Session.set('posts', Posts.find({
        author: this.params.username
      }, {
        reactive: false
      }).fetch());
    }
  };
});
