'use strict';

Meteor.publish('allPosts', () => {
  var result = Posts.find({}, {
    limit: 50,
    fields: {
      oldChildren: false
    }
  });
  return result;
});

Meteor.publish('comments', (id) => {
  return Posts.find({
    _id: id
  });
});

Meteor.publish('user', (username) => {
  return Posts.find({
    author: username
  },{
    limit: 50,
    fields: {
      oldChildren: false
    }
  });
});

Meteor.publish('recentPosts', () => {
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

Meteor.publish('topPosts', (since) => {
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

Meteor.publish('hotPosts', () => {
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
