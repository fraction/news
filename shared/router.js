Router.configure({
  layoutTemplate: 'index'
});

Router.map(function () {
  "use strict";
  this.route('post', {
    path: '/post',
    template: 'post'
  });
  this.route('index', {
    path: '*',
    template: 'feed'
  });
});
