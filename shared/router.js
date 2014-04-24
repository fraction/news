Router.configure({
  layoutTemplate: 'wrapper'
});

Router.map(function () {
  "use strict";
  this.route('home', {
    path: '/',
    action: function () {
      Router.go('/hot/week');
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
      case 'hour':
        start = start - 60 * 60 * 1000;
        templateData.timeHour = true;
        templateData.timeType = 'Hour';
        break;
      case 'day':
        start = start.setDate(start.getDate() - 1);
        templateData.timeDay = true;
        templateData.timeType = 'Day';
        break;
      case 'week':
        start = start.setDate(start.getDate() - 7);
        templateData.timeWeek = true;
        templateData.timeType = 'Week';
        break;
      case 'fortnight':
        start = start.setDate(start.getDate() - 14);
        templateData.timeFortnight = true;
        templateData.timeType = 'Fortnight';
        break;
      case 'month':
        start = start.setFullYear(start.getFullYear(), start.getMonth() - 1);
        templateData.timeMonth = true;
        templateData.timeType = 'Month';
        break;
      case 'quarter':
          start = start.setFullYear(start.getFullYear(), start.getMonth() - 3);
          templateData.timeQuarter = true;
          templateData.timeType = 'Quarter';
          break;
      case 'year':
        start = start.setFullYear(start.getFullYear() - 1);
        templateData.timeYear = true;
        templateData.timeType = 'Year';
        break;
      case 'ever':
        start = 0;
        templateData.timeEver = true;
        templateData.timeType = 'Ever';
        break;
      default:
        Router.go('/hot/week');
        break;
      }

      start = new Date(start);

      if (order === 'top') {
        Meteor.subscribe('topPosts', start);
        templateData.sortType = 'Top';
        templateData.sortTop = true;
        templateData.posts = Posts.find({}, {sort: {oldPoints: -1}});
      } else if (order === 'hot') {
        Meteor.subscribe('hotPosts', start);
        templateData.sortType = 'Hot';
        templateData.sortHot = true;
        templateData.posts = Posts.find({}, {sort: {heat: -1}});
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

        Meteor.subscribe('recentPosts', start);
        templateData.sortType = 'Random';
        templateData.sortRandom = true;
        templateData.posts = shuffle(Posts.find().fetch());
      }
      return templateData;
    }
  });
});
