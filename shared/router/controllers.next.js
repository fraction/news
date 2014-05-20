'use strict';

define('controllers', [], () => {
  var Controllers = {};
  Controllers.page = RouteController.extend({
    onAfterAction: () => {
      $("html, body").animate({scrollTop:0}, 500, 'swing');
    }
  });

  Controllers.news = Controllers.page.extend({
    onAfterAction: () => {
      Session.set('showComments', false);
    }
  });

  return Controllers;
});
