PageController = RouteController.extend({
  onAfterAction: function () {
    "use strict";
    $("html, body").animate({scrollTop:0}, 500, 'swing');
  }
});
