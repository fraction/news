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
  layoutTemplate: 'index'
});

Router.map(function () {
  "use strict";
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

  this.route('index', {
    path:     '/recent',
    template: 'feed',
    data: function () {
      var templateData = {
        currentView: 'Home',
        isFeed: true,
        sortType: 'Recent',
        sortRecent : true,
        posts: Posts.find().fetch()
      };
      return templateData;
    }
  });

  this.route('random', {
    path:     '/random',
    template: 'feed',
    data: function () {
      var templateData = {
        currentView: 'Home',
        isFeed: true,
        sortType: 'Random',
        sortRandom: true,
        posts: shuffle(Posts.find().fetch())
      };
      return templateData;
    }
  });

  this.route('popular', {
    path:     '/',
    template: 'feed',
    data: function () {
      var posts = Posts.find().fetch();
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

      var templateData = {
        currentView: 'Home',
        isFeed: true,
        sortType: 'Popular',
        sortPopular: true,
        posts: Session.get('posts')
      };
      return templateData;
    }
  });

  this.route('user', {
    path:     'user/:username',
    template: 'user',
    data: function () {
      var templateData = {
        currentView: 'Profile',
        username: this.params.username,
        posts: Posts.find({username : this.params.username})
      };
      return templateData;
    }
  });

  this.route('comments', {
    path:     'comments/:id/*',
    template: 'comments'
  });
});
