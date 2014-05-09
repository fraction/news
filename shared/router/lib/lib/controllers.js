PageController = RouteController.extend({
  onAfterAction: function () {
    "use strict";
    $("html, body").animate({scrollTop:0}, 500, 'swing');
  }
});

NewsController = PageController.extend({
  onAfterAction: function () {
    "use strict";
    Session.set('showComments', false);
  }
});
