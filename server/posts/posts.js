Meteor.publish('posts', function() {
  "use strict";
  return Posts.find();});
