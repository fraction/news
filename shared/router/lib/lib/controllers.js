'use strict';

define('controllers', [], function () {
  var Controllers = {};
  Controllers.page = RouteController.extend({
    onAfterAction: function () {
      $("html, body").animate({scrollTop:0}, 500, 'swing');
    }
  });

  Controllers.news = Controllers.page.extend({
    onAfterAction: function () {
      Session.set('showComments', false);
    }
  });

  return Controllers;
});
