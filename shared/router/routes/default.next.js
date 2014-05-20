'use strict';

define('routeDefault', 'posts', () => {
  return {
    name: 'default',
    path: '*',
    action: () => {
      Router.go('/hot');
    }
  };
});
