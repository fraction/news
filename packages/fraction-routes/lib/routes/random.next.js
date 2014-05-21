'use strict';

Routes.random = {
  name: 'random',
  controller: Routes.Controllers.news,
  path:     '/random',
  waitOn: () => {
    return Meteor.subscribe('recentPosts');
  },
  onAfterAction: () => {
    Routes.setNews('random');

    Session.set('findSelector', {});
    Session.set('findOptions', {
      reactive: false
    });
    Session.set('posts', Utilities.shuffle(Posts.find(
      Session.get('findSelector'),
      Session.get('findOptions')
    ).fetch()));
  }
};
