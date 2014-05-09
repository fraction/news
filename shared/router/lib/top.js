topRoute = {
  path:     '/top/:time',
  template: 'listPosts',
  waitOn: function () {
    "use strict";

    var time = this.params.time.toLowerCase();

    // what type of time to subscribe to
    var actions = {
      hour: function (now) {
        return now - 60 * 60 * 1000;
      },
      day: function (now) {
        return now.setDate(now.getDate() - 1);
      },
      week: function (now) {
        return now.setDate(now.getDate() - 7);
      },
      month: function (now) {
        return now.setFullYear(now.getFullYear(), now.getMonth() - 1);
      },
      year: function (now) {
        return now.setFullYear(now.getFullYear() - 1);
      },
      ever: function () {
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
    "use strict";

    var time = this.params.time.toLowerCase();
    Session.set('showComments', false);
    Session.set('sortTime', time);
    Session.set('sortType', 'top');
    Session.set('posts', Posts.find({}, {
      reactive: false,
      sort: {
        heat: -1
      }
    }).fetch());
    Session.set('currentView', 'Top News');

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
