'use strict';

var depend = [
  'routeComments'
, 'routeDefault'
, 'routeHot'
, 'routeRandom'
, 'routeRecent'
, 'routeRoot'
, 'routeTop'
, 'routeUser'
];

define('routes', depend, function () {
  var Routes = {};

  _(arguments).forEach(function (route) {
    Routes[route.name] = route;
  });

  return Routes;
});
