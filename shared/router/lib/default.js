/* global defaultRoute:true */

defaultRoute = {
  path: '*',
  action: function () {
    "use strict";
    Router.go('/hot');
  }
};
