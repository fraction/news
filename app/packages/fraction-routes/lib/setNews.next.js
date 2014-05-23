'use strict';

Routes.setNews = (sort) => {
  var cap = sort.charAt(0).toUpperCase() + sort.slice(1);
  Session.set('sortType', sort);
  Session.set('currentView', cap + ' News');
};
