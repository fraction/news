'use strict';

define('routeRoot', [], () => {
  return {
    name: 'root',
    path: '/',
    action: () => {
      Router.go('/hot');
    }
  };
});
