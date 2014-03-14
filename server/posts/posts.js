Meteor.publish('posts', function () {
  "use strict";
  var result = Posts.find({}, {
    fields: {
      time: false
    }
  });

  return result;
});
