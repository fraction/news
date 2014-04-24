var setHeat = function () {
  "use strict";
  var allArr = Posts.find({
    oldPoints: {
      $gt: 1
    }
  }).fetch();

  console.log('Calculating post heat');

  _(allArr).forEach(function (post) {
    var secondsAgo = Math.abs((new Date()) - (new Date(post.createdAt))) / 1000;
    var hoursAgo = secondsAgo / 60;
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

Meteor.startup(setHeat);

// run every 10 seconds
Meteor.setInterval(setHeat, 10 * 1000);
