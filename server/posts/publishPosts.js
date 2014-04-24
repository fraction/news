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

Meteor.publish('bestPosts', function (start) {
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
    limit: 50
  });
});

Meteor.publish('hotPosts', function (start) {
  "use strict";
  var allArr = Posts.find({
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
    limit: 10000
  }).fetch();

  var hotTable = {};

  console.log('Sorting the ' + allArr.length + ' hottest posts');

  _(allArr).forEach(function (post) {
    var secondsAgo = Math.abs((new Date()) - (new Date(post.createdAt))) / 1000;
    var hoursAgo = secondsAgo / 60;
    var points = (post.oldPoints - 1);
    var decay = (hoursAgo + 2) ^ 1.5;
    hotTable[post._id] = points / decay;
  });

  var sortObject = function (obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return b.value - a.value; });
    return arr; // returns array
  }

  var sorted = sortObject(hotTable);

  // delete all of the old data and insert the new stuff
  Hot.remove({}, function (err) {
    if (err) {
      throw error;
    } else {
      _.forEach(sorted, function (el) {
        Meteor.bindEnvironment(function() {
          Hot.insert(Posts.findOne({_id: el.key}));
        })();
      });
    }
  });

  return Hot.find();
})


Meteor.publish('randomPosts', function (start) {
  "use strict";
  return Posts.find({
    createdAt: {$gte: start}
  },{
    limit: 50,
    skip: 10
  });
});
