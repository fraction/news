Meteor.subscribe('posts');

Template.feed.posts = function () {
  "use strict";
  return Posts.find().fetch();
};
