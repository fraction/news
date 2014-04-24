Router.configure({
  layoutTemplate: 'wrapper'
});

Router.map(function () {
  "use strict";
  this.route('home', {
    path: '/',
    action: function () {
      Router.go('/hot/weekly');
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

  this.route('feed', {
    path:     '/:order/:time',
    template: 'feed',
    data: function () {
      var order = this.params.order.toLowerCase();
      var start = new Date();
      var time = this.params.time.toLowerCase();
      var templateData = {
        currentView: 'Home',
        isFeed: true
      };

      switch (time) {
      case 'daily':
        start = start.setDate(start.getDate() - 1);
        templateData.timeDaily = true;
        templateData.timeType = 'Daily';
        break;
      case 'weekly':
        start = start.setDate(start.getDate() - 7);
        templateData.timeWeekly = true;
        templateData.timeType = 'Weekly';
        break;
      case 'fortnightly':
        start = start.setDate(start.getDate() - 14);
        templateData.timeFortnightly = true;
        templateData.timeType = 'Fortnightly';
        break;
      case 'monthly':
        start = start.setFullYear(start.getFullYear(), start.getMonth() - 1);
        templateData.timeMonthly = true;
        templateData.timeType = 'Monthly';
        break;
      case 'yearly':
        start = start.setFullYear(start.getFullYear() - 1);
        templateData.timeYearly = true;
        templateData.timeType = 'Yearly';
        break;
      case 'ever':
        start = 0;
        templateData.timeEver = true;
        templateData.timeType = 'Ever';
        break;
      default:
        Router.go('/hot/weekly');
        break;
      }

      start = new Date(start);

      if (order === 'best') {
        Meteor.subscribe('bestPosts', start);
        templateData.sortType = 'Best';
        templateData.sortBest = true;
        templateData.posts = Posts.find({}, {sort: {oldPoints: -1}});
      } else if (order === 'hot') {
        Meteor.subscribe('hotPosts', start);
        templateData.sortType = 'Hot';
        templateData.sortHot = true;
        templateData.posts = Hot.find();
      } else if (order === 'recent') {
        Meteor.subscribe('recentPosts', start);
        templateData.sortType = 'Recent';
        templateData.sortRecent = true;
        templateData.posts = Posts.find({}, {sort: {createdAt: -1}});
      } else if (order === 'random') {
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


        Meteor.subscribe('randomPosts', start);
        templateData.sortType = 'Random';
        templateData.sortRandom = true;
        templateData.posts = shuffle(Posts.find().fetch());
      }
      return templateData;
    }
  });
});
