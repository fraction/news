// todo: make a lib and move this
var shuffle = function (array) {
  "use strict";
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

Router.configure({
  layoutTemplate: 'wrapper'
});

Router.map(function () {
  "use strict";
  this.route('home', {
    path: '/',
    action: function () {
      Router.go('/popular/weekly');
    }
  });

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

      switch (time) {
      case 'daily':
        start = new Date(start.setDate(start.getDate() - 1));
        break;
      case 'weekly':
        start = new Date(start.setDate(start.getDate() - 7));
        break;
      case 'monthly':
        start = new Date(start.setFullYear(start.getFullYear(), start.getMonth() - 1));
        break;
      case 'yearly':
        start = new Date(start.setFullYear(start.getFullYear() - 1));
        break;
      case 'ever':
        start = new Date(0);
        break;
      default:
        Router.go('/popular/weekly');
        break;
      }

      console.log(start);

      var templateData = {
        currentView: 'Home',
        isFeed: true
      };
      if (order === 'popular') {
        var posts = Posts.find({time: {$gte: start}}).fetch();
        var popularPosts = [];
        var pointTable = [];
        Meteor.call('countVotes', posts, function (err, data) {
          pointTable = data;
          pointTable.sort(function(a, b) {
            return b.votes - a.votes;
          });
          _(pointTable).forEach(function (obj) {
            popularPosts.push(Posts.findOne({ '_id' : obj.id}));
          });
          Session.set('posts', popularPosts);
        });

        templateData.sortType = 'Popular';
        templateData.sortPopular = true;
        templateData.posts = Session.get('posts');
      } else if (order === 'recent') {
        templateData.sortType = 'Recent';
        templateData.sortRecent = true;
        templateData.posts = Posts.find({time: {$gte: start}}).fetch();
      } else if (order === 'random') {
        templateData.sortType = 'Random';
        templateData.sortRandom = true;
        templateData.posts = shuffle(Posts.find({time: {$gte: start}}).fetch());
      }
      return templateData;
    }
  });
});
