'use strict';

Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction('loading');

Router.map(function () {


  this.route('comments', Route.comments);
  this.route('hot', Route.hot);
  this.route('random', Route.random);
  this.route('recent', Route.recent);
  this.route('root', Route.root);
  this.route('top', Route.top);
  this.route('user', Route.user);

  // needs to go last so that it doesn't catch all requests
  this.route('default', Route.default);
});
