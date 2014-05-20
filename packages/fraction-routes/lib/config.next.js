'use strict';

Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction('loading');

Router.map(function () {
  this.route('comments', Routes.comments);
  this.route('hot', Routes.hot);
  this.route('random', Routes.random);
  this.route('recent', Routes.recent);
  this.route('root', Routes.root);
  this.route('top', Routes.top);
  this.route('user', Routes.user);

  // needs to go last so that it doesn't catch all requests
  this.route('default', Routes.default);
});
