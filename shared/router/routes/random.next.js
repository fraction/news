'use strict';

var depend = ['posts', 'setNews', 'shuffle', 'controllers'];

define('routeRandom', depend, (Posts, setNews, shuffle, Controllers) => {
  return {
    name: 'random',
    controller: Controllers.news,
    path:     '/random',
    template: 'listPosts',
    waitOn: () => {
      return Meteor.subscribe('recentPosts');
    },
    onAfterAction: () => {
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
