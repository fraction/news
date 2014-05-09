Route.default = {
  path: '*',
  action: function () {
    "use strict";
    Router.go('/hot');
  }
};
