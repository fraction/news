Router.configure({
  layoutTemplate: 'wrapper'
});

Router.map(function () {
  "use strict";
  this.route('home', {
    path: '/',
    action: function () {
      Router.go('/hot');
    }
  });

/* disabled
  this.route('newPost', {
    path:     '/new-post',
    template: 'newPost',
    data: function () {
      var templateData = {
        currentView: 'New Post',
        posts: Posts.find({username : this.params.username})
      };
      return templateData;
    }
  });
*/
/*
  this.route('user', {
    path:     'user/:username',
    template: 'user',
    data: function () {
      var templateData = {
        currentView: 'User',
        username: this.params.username,
        posts: Posts.find({username : this.params.username})
      };
      return templateData;
    }
  });
*/
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
        quarter: function (start) {
          return start.setFullYear(start.getFullYear(), start.getMonth() - 3);
        },
        year: function (start) {
          return start.setFullYear(start.getFullYear() - 1);
        },
        ever: function () {
          return 0;
        },
      };

      console.log('wat');

      // figure out when
      if (typeof actions[time] !== 'function') {
        Router.go('/hot');
      } else {
        var start = actions[time](new Date());
        return Meteor.subscribe('topPosts', new Date(start));
      }
    },
    data: function () {
      var time = this.params.time.toLowerCase();

      var templateData = {
        currentView: 'Home',
        isFeed: true
      };

      var setTemplateData = function (time, data) {
        var accepted = [
          'hour',
          'day',
          'week',
          'fortnight',
          'month',
          'quarter',
          'year',
          'ever'
        ];

        if (_.contains(accepted, time)) {
          var cap = time.charAt(0).toUpperCase() + time.slice(1);
          data.timeType = cap;
          data['time' + cap] = true;
          return data;
        } else {
          return false;
        }
      };

      templateData = setTemplateData(time, templateData);

      if (templateData !== false) {
        templateData.sortType = 'Top';
        templateData.sortTop = true;
        templateData.posts = Posts.find({}, {
          reactive: false,
          sort: {
            oldPoints: -1
          }
        });
        return templateData;
      } else {
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
    data: function () {
      var templateData = {
        currentView: 'Home',
        isFeed: true
      };


      templateData.sortType = 'Hot';
      templateData.sortHot = true;
      templateData.posts = Posts.find({}, {
        reactive: false,
        sort: {
          heat: -1
        }
      });
      return templateData;
    }
  });

  this.route('recent', {
    path:     '/recent',
    template: 'feed',
    waitOn: function () {
      return Meteor.subscribe('recentPosts');
    },
    data: function () {
      var templateData = {
        currentView: 'Home',
        isFeed: true
      };

      templateData.sortType = 'Recent';
      templateData.sortRecent = true;
      templateData.posts = Posts.find({}, {
        reactive: false,
        sort: {
          createdAt: -1
        }
      });

      return templateData;
    }
  });

  this.route('random', {
    path:     '/random',
    template: 'feed',
    waitOn: function () {
      return Meteor.subscribe('recentPosts');
    },
    data: function () {
      var templateData = {
        currentView: 'Home',
        isFeed: true
      };

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

      templateData.sortType = 'Random';
      templateData.sortRandom = true;
      templateData.posts = shuffle(Posts.find({}, {
        reactive: false
      }).fetch());
      
      return templateData;
    }
  });


  this.route('home', {
    path: '*',
    action: function () {
      Router.go('/hot');
    }
  });
});
