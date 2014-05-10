'use strict';

define('routeRoot', [], function () {
  return {
    name: 'root',
    path: '/',
    action: function () {
      Router.go('/hot');
    }
  };
});
