/* global rootRoute:true */

rootRoute = {
  path: '/',
  action: function () {
    "use strict";
    Router.go('/hot');
  }
};
