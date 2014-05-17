'use strict';


Meteor.startup(function () {
  define('votes', [], function () {
    return Votes;
  });

  define('posts', [], function () {
    return Posts;
  });
});
