'use strict';

Meteor.publish('allPosts', function () {
  var result = Posts.find({}, {
    limit: 50,
    fields: {
      oldChildren: false
    }
  });
  return result;
});

Meteor.publish('comments', function (id) {
  return Posts.find({
    _id: id
  });
});

Meteor.publish('user', function (username) {
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

Meteor.publish('topPosts', function (since) {
  return Posts.find({
    oldPoints: {
      $gt: 1
    },
    createdAt: {
      $gte: since
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
