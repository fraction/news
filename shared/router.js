Router.configure({
  layoutTemplate: 'layout'
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
    template: 'listPosts',
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
    template: 'listPosts',
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
    template: 'listPosts',
    waitOn: function () {
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
      var time = this.params.time.toLowerCase();
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
  });

  this.route('hot', {
    path:     '/hot',
    template: 'listPosts',
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
    template: 'listPosts',
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
    template: 'listPosts',
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
