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
    path:     'user/:id',
    template: 'user'
  });
  this.route('comments', {
    path:     'comments/:id/*',
    template: 'comments'
  });
});
