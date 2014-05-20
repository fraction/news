'use strict';

Routes.default = {
  name: 'default',
  path: '*',
  action: () => {
    Router.go('/hot');
  }
};
