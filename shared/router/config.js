/*jshint undef:false */

Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction('loading');

Router.map(function () {
  "use strict";

  this.route('comments', commentsRoute);
  this.route('hot', hotRoute);
  this.route('random', randomRoute);
  this.route('recent', recentRoute);
  this.route('root', rootRoute);
  this.route('top', topRoute);
  this.route('user', userRoute);

  // needs to go last so that it doesn't catch all requests
  this.route('default', defaultRoute);
});
