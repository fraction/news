Meteor.publish('posts', function() {
  "use strict";
  return Posts.find({}, {
    fields: {
      time: false
    }
  });});
