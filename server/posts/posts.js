Meteor.publish('posts', function () {
  "use strict";
  var result = Posts.find({}, {
    sort: {
      time: -1
    },
    limit: 50
  });
  return result;
});
