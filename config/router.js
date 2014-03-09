Router.configure({
  layoutTemplate: 'index'
});

Router.map(function () {
  this.route('index', {
    path: '*',
    template: 'feed'
  });
});
