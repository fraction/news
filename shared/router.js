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
}

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
    path:     '/',
    template: 'feed',
    data: function () {
      var templateData = {
        currentView: 'Home',
        isFeed: true,
        sortType: 'recent',
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
        sortType: 'random',
        posts: shuffle(Posts.find().fetch())
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
