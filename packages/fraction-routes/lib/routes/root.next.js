'use strict';

Routes.root = {
  name: 'root',
  path: '/',
  action: () => {
    Router.go('/hot');
  }
};
