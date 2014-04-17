Meteor.publish('allPosts', function () {
  "use strict";
  var result = Posts.find({}, {
    limit: 50
  });
  return result;
});

Meteor.publish('recentPosts', function (start) {
  "use strict";
  return Posts.find({
    createdAt: {
      $gte: start
    }
  },{
    sort: {
      createdAt: -1
    },
    limit: 50
  });
});

Meteor.publish('popularPosts', function (start) {
  "use strict";
  return Posts.find({
    createdAt: {
      $gte: start
    }
  }, {
    sort: {
      oldPoints: -1
    },
    limit: 50
  });
});



Meteor.publish('randomPosts', function (start) {
  "use strict";
  return Posts.find({
    createdAt: {$gte: start}
  },{
    limit: 50,
    skip: 10
  });
});
