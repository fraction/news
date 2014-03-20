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
        currentView: 'Popular',
      };
      return templateData;
    }
  });

  this.route('user', {
    path:     'user/:username',
    template: 'user',
    data: function () {
      var templateData = {
        currentView: this.params.username,
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
