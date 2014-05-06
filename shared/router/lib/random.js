/* global randomRoute:true */

// todo: make a lib and move this
var shuffle = function (array) {
  "use strict";

  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};


randomRoute = {
  path:     '/random',
  template: 'listPosts',
  waitOn: function () {
    "use strict";
    return Meteor.subscribe('recentPosts');
  },
  onAfterAction: function () {
    "use strict";

    Session.set('sortType', 'random');
    Session.set('currentView', 'Random News');
    Session.set('posts', shuffle(Posts.find({}, {
      reactive: false
    }).fetch()));
  }
};
