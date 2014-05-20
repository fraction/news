'use strict';

Routes.recent = {
  name: 'recent',
  controller: Routes.Controllers.news,
  path:     '/recent',
  template: 'listPosts',
  waitOn: () => {
    return Meteor.subscribe('recentPosts');
  },
  onAfterAction: () => {
    Routes.setNews('recent');
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
