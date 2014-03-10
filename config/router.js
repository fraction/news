Router.configure({
  layoutTemplate: 'index'
});

Router.map(function () {
  "use strict"
  this.route('index', {
    path: '*',
    template: 'feed'
  });
});
