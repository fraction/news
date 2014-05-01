Router.configure({
  layoutTemplate: 'wrapper'
});

Router.onBeforeAction('loading');

Router.map(function () {
  "use strict";
  this.route('home', {
    path: '/',
    action: function () {
      Router.go('/hot');
    }
  });

  this.route('comments', {
    path: '/comments/:id',
    template: 'feed',
    waitOn: function () {
      return Meteor.subscribe('comments', this.params.id);
    },
    onAfterAction: function () {
      Session.set('posts', Posts.find({
        _id: this.params.id
      }, {
        reactive: false
      }).fetch());
      Session.set('currentView', 'Comments');
      Session.set('sortType', null);
    }
  });

  this.route('user', {
    path: '/user/:username',
    template: 'feed',
    waitOn: function () {
      return Meteor.subscribe('user', this.params.username);
    },
    data: function () {
      Session.set('currentView', 'Profile');
      Session.set('back', Session.get('sortType'));
      Session.set('sortType', null);
      Session.set('posts', Posts.find({
        author: this.params.username
      }, {
        reactive: false
      }).fetch());
    }
  });

  this.route('top', {
    path:     '/top/:time',
    template: 'feed',
    waitOn: function () {
      var time = this.params.time.toLowerCase();

      // what type of time to subscribe to
      var actions = {
        hour: function (start) {
          return start - 60 * 60 * 1000;
        },
        day: function (start) {
          return start.setDate(start.getDate() - 1);
        },
        week: function (start) {
          return start.setDate(start.getDate() - 7);
        },
        fortnight: function (start) {
          return start.setDate(start.getDate() - 14);
        },
        month: function (start) {
          return start.setFullYear(start.getFullYear(), start.getMonth() - 1);
        },
        year: function (start) {
          return start.setFullYear(start.getFullYear() - 1);
        },
        ever: function () {
          return 0;
        },
      };

      // figure out when
      if (typeof actions[time] !== 'function') {
        Router.go('/hot');
      } else {
        var start = actions[time](new Date());
        return Meteor.subscribe('topPosts', new Date(start));
      }
    },
    onAfterAction: function () {
      var time = this.params.time.toLowerCase();
      Session.set('topTime', time);
      Session.set('sortType', 'top');
      Session.set('posts', Posts.find({}, {
        reactive: false,
        sort: {
          oldPoints: -1
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
  });

  this.route('hot', {
    path:     '/hot',
    template: 'feed',
    waitOn: function () {
      return Meteor.subscribe('hotPosts');
    },
    onAfterAction: function () {
      Session.set('sortType', 'hot');
      Session.set('currentView', 'Hot News');
      Session.set('posts', Posts.find({}, {
        reactive: false,
        sort: {
          heat: -1
        }
      }).fetch());
    }
  });

  this.route('recent', {
    path:     '/recent',
    template: 'feed',
    waitOn: function () {
      return Meteor.subscribe('recentPosts');
    },
    onAfterAction: function () {
      Session.set('sortType', 'recent');
      Session.set('currentView', 'Recent News');
      Session.set('posts', Posts.find({}, {
        reactive: false,
        sort: {
          createdAt: -1
        }
      }).fetch());
    }
  });

  this.route('random', {
    path:     '/random',
    template: 'feed',
    waitOn: function () {
      return Meteor.subscribe('recentPosts');
    },
    onAfterAction: function () {
      // todo: make a lib and move this
      var shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      };

      Session.set('sortType', 'random');
      Session.set('currentView', 'Random News');
      Session.set('posts', shuffle(Posts.find({}, {
        reactive: false
      }).fetch()));
    }
  });


  this.route('home', {
    path: '*',
    action: function () {
      Router.go('/hot');
    }
  });
});
