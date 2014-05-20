'use strict';

var depend = [
  'routeComments',
  'routeDefault',
  'routeHot',
  'routeRandom',
  'routeRecent',
  'routeRoot',
  'routeTop',
  'routeUser'
];

define('routes', depend, () => {
  var Routes = {};

  _(arguments).forEach((route) => {
    Routes[route.name] = route;
  });

  return Routes;
});
