'use strict';

Routes.hot = {
  name: 'hot',
  controller: Routes.Controllers.news,
  path:     '/hot',
  template: 'listPosts',
  waitOn: () => {
    return Meteor.subscribe('hotPosts');
  },
  onAfterAction: () => {
    Routes.setNews('hot');
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
