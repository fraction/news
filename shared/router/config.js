Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction('loading');

Router.map(function () {
  "use strict";
  
  this.route('home', {
    path: '/',
    action: function () {
      Router.go('/hot');
    }
  });

  this.route('home', {
    path: '*',
    action: function () {
      Router.go('/hot');
    }
  });
});
