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
      Session.set('posts', shuffle(Posts.find({}, {
        reactive: false
      }).fetch()));
    }
  };
});
