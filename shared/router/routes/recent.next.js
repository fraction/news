'use strict';

var depend = ['posts', 'setNews', 'controllers'];

define('routeRecent', depend, (Posts, setNews, Controllers) => {
  return {
    name: 'recent',
    controller: Controllers.news,
    path:     '/recent',
    template: 'listPosts',
    waitOn: () => {
      return Meteor.subscribe('recentPosts');
    },
    onAfterAction: () => {
      setNews('recent');
      Session.set('findSelector', {});
      Session.set('findOptions', {
        reactive: false,
        sort: {
          createdAt: -1
        }
      });
      Session.set('posts', Posts.find(
        Session.get('findSelector'),
        Session.get('findOptions')
      ).fetch());
    }
  };
});
