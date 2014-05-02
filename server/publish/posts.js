Meteor.publish('allPosts', function () {
  "use strict";
  var result = Posts.find({}, {
    limit: 50,
    fields: {
      oldChildren: false
    }
  });
  return result;
});

Meteor.publish('comments', function (id) {
  "use strict";

  return Posts.find({
    _id: id
  });
});

Meteor.publish('user', function (username) {
  "use strict";

  return Posts.find({
    author: username
  },{
    limit: 50,
    fields: {
      oldChildren: false
    }
  });
});

Meteor.publish('recentPosts', function () {
  "use strict";
  return Posts.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 50,
    fields: {
      oldChildren: false
    }
  });
});

Meteor.publish('topPosts', function (start) {
  "use strict";
  return Posts.find({
    oldPoints: {
      $gt: 1
    },
    createdAt: {
      $gte: start
    }
  }, {
    sort: {
      oldPoints: -1
    },
    limit: 50,
    fields: {
      oldChildren: false
    }
  });
});

Meteor.publish('hotPosts', function () {
  "use strict";
  return Posts.find({}, {
    limit: 50,
    sort: {
      heat: -1
    },
    fields: {
      oldChildren: false
    }
  });
});
