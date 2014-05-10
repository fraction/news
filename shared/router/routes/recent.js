'use strict';

var depend = ['posts', 'setNews', 'controllers'];

define('routeRecent', depend, function (Posts, setNews, Controllers) {
  return {
    name: 'recent',
    controller: Controllers.news,
    path:     '/recent',
    template: 'listPosts',
    waitOn: function () {
      return Meteor.subscribe('recentPosts');
    },
    onAfterAction: function () {

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
