'use strict';

Routes.top = {
  name: 'top',
  controller: Routes.Controllers.news,
  path:     '/top/:time',
  waitOn: function () {
    var time = this.params.time.toLowerCase();

    // what type of time to subscribe to
    var actions = {
      hour: (now) => {
        return now - 60 * 60 * 1000;
      },
      day: (now) => {
        return now.setDate(now.getDate() - 1);
      },
      week: (now) => {
        return now.setDate(now.getDate() - 7);
      },
      month: (now) => {
        return now.setFullYear(now.getFullYear(), now.getMonth() - 1);
      },
      year: (now) => {
        return now.setFullYear(now.getFullYear() - 1);
      },
      ever: () => {
        return 0;
      },
    };

    // figure out when
    if (typeof actions[time] !== 'function') {
      Router.go('/top/week');
    } else {
      var since = actions[time](new Date());
      return Meteor.subscribe('topPosts', new Date(since));
    }
  },
  onAfterAction: function () {
    var time = this.params.time.toLowerCase();

    Routes.setNews('top');
    Session.set('sortTime', time);

    Session.set('findSelector', {});
    Session.set('findOptions', {
      reactive: false,
      sort: {
        oldPoints: -1
      }
    });
    Session.set('posts', Posts.find(
      Session.get('findSelector'),
      Session.get('findOptions')
    ).fetch());

    var accepted = [
      'hour',
      'day',
      'week',
      'fortnight',
      'month',
      'year',
      'ever'
    ];

    if (!_.contains(accepted, time)) {
      Router.go('/top/week');
    }
  }
};
