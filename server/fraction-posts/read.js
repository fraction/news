Meteor.publish('posts', function () {
  "use strict";
  var result = Posts.find({}, {
    limit: 50
  });
  return result;
});
