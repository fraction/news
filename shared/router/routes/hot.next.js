'use strict';

var depend = ['posts', 'setNews', 'controllers'];

define('routeHot', depend, (Posts, setNews, Controllers) => {
  return {
    name: 'hot',
    controller: Controllers.news,
    path:     '/hot',
    template: 'listPosts',
    waitOn: () => {
      return Meteor.subscribe('hotPosts');
    },
    onAfterAction: () => {
      setNews('hot');
      Session.set('findSelector', {});
      Session.set('findOptions', {
        reactive: false,
        sort: {
          heat: -1
        }
      });
      Session.set('posts', Posts.find(
        Session.get('findSelector'),
        Session.get('findOptions')
      ).fetch());
    }
  };
});
