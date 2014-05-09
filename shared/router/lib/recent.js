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
      Session.set('posts', Posts.find({}, {
        reactive: false,
        sort: {
          createdAt: -1
        }
      }).fetch());
    }
  };
});
