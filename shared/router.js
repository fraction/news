Router.configure({
  layoutTemplate: 'index'
});

Router.map(function () {
  "use strict";
  this.route('newPost', {
    path:     '/new-post',
    template: 'newPost'
  });
  this.route('index', {
    path:     '/',
    template: 'feed'
  });
  this.route('user', {
    path:     'user/:username',
    template: 'user',
    data: function () {
      var templateData = {
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
