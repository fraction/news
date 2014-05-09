var setPostHeat = function () {
  "use strict";
  var allArr = Posts.find({
    oldPoints: {
      $gt: 1
    }
  }).fetch();

  console.log('Setting post heat for ' + allArr.length + ' posts');
  _(allArr).forEach(function (post) {
    var secondsAgo = Math.abs((new Date()) - (new Date(post.createdAt))) / 1000;
    var hoursAgo = secondsAgo / 60 / 60;
    var points = (post.oldPoints - 1);
    var decay = Math.pow(hoursAgo + 2, 1.5);
    Posts.update({
      _id: post._id
    },{
      $set: {
        heat: points / decay
      }
    });
  });
};

// run every 6 seconds
Meteor.setInterval(setPostHeat, 6 * 1000);
