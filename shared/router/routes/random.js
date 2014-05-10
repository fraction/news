'use strict';

var depend = ['posts', 'setNews', 'shuffle', 'controllers'];

define('routeRandom', depend, function (Posts, setNews, shuffle, Controllers) {
  return {
    name: 'random',
    controller: Controllers.news,
    path:     '/random',
    template: 'listPosts',
    waitOn: function () {
      return Meteor.subscribe('recentPosts');
    },
    onAfterAction: function () {
      setNews('random');

      Session.set('findSelector', {});
      Session.set('findOptions', {
        reactive: false
      });
      Session.set('posts', shuffle(Posts.find(
        Session.get('findSelector'),
        Session.get('findOptions')
      ).fetch()));
    }
  };
});
