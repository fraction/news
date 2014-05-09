'use strict';


Route.root = {
  path: '/',
  action: function () {
    Router.go('/hot');
  }
};
