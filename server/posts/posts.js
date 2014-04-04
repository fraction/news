Meteor.publish('posts', function () {
  "use strict";
  var result = Posts.find({}, {
    sort: {
      time: -1
    },
    limit: 8
  });
  return result;
});
