'use strict';

PostHeat.set = {
  now: () => {
    var allArr = Posts.find({
      oldPoints: {
        $gt: 1
    }}).fetch();

    var savePost = (post) => {
      var now = new Date();
      var secondsAgo = Math.abs(now - (new Date(post.createdAt))) / 1000;
      var hoursAgo = secondsAgo / 60 / 60;
      var points = (post.oldPoints - 1);
      var decay = Math.pow(hoursAgo + 2, 1.5);
      Posts.update({ _id: post._id },{
        $set: {
          heat: points / decay
      }});
    };

    console.log('Setting post heat for ' + allArr.length + ' posts');

    _(allArr).forEach(savePost);
  },
  every: (interval) => {
    Meteor.setInterval(this.set, interval);
  }
};

PostHeat.set.every(60 * 1000);
