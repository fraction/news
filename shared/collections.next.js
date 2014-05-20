'use strict';


Meteor.startup(() => {
  define('votes', [], () => {
    return Votes;
  });

  define('posts', [], () => {
    return Posts;
  });
});
