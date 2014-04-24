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

  this.route('top', {
    path:     '/top/:time',
    template: 'feed',
    waitOn: function () {
      var start = new Date();
      var time = this.params.time.toLowerCase();

      switch (time) {
      case 'hour':
        start = start - 60 * 60 * 1000;
        break;
      case 'day':
        start = start.setDate(start.getDate() - 1);
        break;
      case 'week':
        start = start.setDate(start.getDate() - 7);
        break;
      case 'fortnight':
        start = start.setDate(start.getDate() - 14);
        break;
      case 'month':
        start = start.setFullYear(start.getFullYear(), start.getMonth() - 1);
        break;
      case 'quarter':
        start = start.setFullYear(start.getFullYear(), start.getMonth() - 3);
        break;
      case 'year':
        start = start.setFullYear(start.getFullYear() - 1);
        break;
      case 'ever':
        start = 0;
        break;
      default:
        Router.go('/hot/week');
        break;
      }

      start = new Date(start);
      return Meteor.subscribe('topPosts', new Date(start));
    },
    data: function () {
      var start = new Date();
      var time = this.params.time.toLowerCase();

      var templateData = {
        currentView: 'Home',
        isFeed: true
      };

      switch (time) {
      case 'hour':
        templateData.timeHour = true;
        templateData.timeType = 'Hour';
        break;
      case 'day':
        templateData.timeDay = true;
        templateData.timeType = 'Day';
        break;
      case 'week':
        templateData.timeWeek = true;
        templateData.timeType = 'Week';
        break;
      case 'fortnight':
        templateData.timeFortnight = true;
        templateData.timeType = 'Fortnight';
        break;
      case 'month':
        templateData.timeMonth = true;
        templateData.timeType = 'Month';
        break;
      case 'quarter':
        templateData.timeQuarter = true;
        templateData.timeType = 'Quarter';
        break;
      case 'year':
        templateData.timeYear = true;
        templateData.timeType = 'Year';
        break;
      case 'ever':
        templateData.timeEver = true;
        templateData.timeType = 'Ever';
        break;
      default:
        Router.go('/hot/week');
        break;
      }

      templateData.sortType = 'Top';
      templateData.sortTop = true;
      templateData.posts = Posts.find({}, {sort: {oldPoints: -1}});
      return templateData;
    }
  });

  this.route('hot', {
    path:     '/hot',
    template: 'feed',
    waitOn: function () {
      return Meteor.subscribe('hotPosts');
    },
    data: function () {
      var start = new Date();

      var templateData = {
        currentView: 'Home',
        isFeed: true
      };


      templateData.sortType = 'Hot';
      templateData.sortHot = true;
      templateData.posts = Posts.find({}, {sort: {heat: -1}});
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
      var start = new Date();

      var templateData = {
        currentView: 'Home',
        isFeed: true
      };

      templateData.sortType = 'Recent';
      templateData.sortRecent = true;
      templateData.posts = Posts.find({}, {sort: {createdAt: -1}});
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
      var start = new Date();
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
      templateData.posts = shuffle(Posts.find().fetch());
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
