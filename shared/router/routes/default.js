'use strict';

define('routeDefault', 'posts', function () {
  return {
    name: 'default',
    path: '*',
    action: function () {
      Router.go('/hot');
    }
  };
});
