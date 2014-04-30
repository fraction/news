if (Meteor.settings.environment === 'production') {
  var Twit =    Meteor.require('twit');
  var twitter = new Twit(Meteor.settings.twitter);

  var postHot = function () {
    "use strict";
    var hot = Posts.find({}, {
      limit: 50,
      sort: {
        heat: -1
      },
      fields: {
        oldChildren: false
      }
    }).fetch();

    var finished = false;
    _(hot).forEach(function (item) {
      // it hasn't been tweeted yet
      if (finished === false && (typeof item.tweeted === 'undefined')) {
          twitter.post('statuses/update',
          {
            status: item.title + "\n" +
            'http://beta.fraction.io/comments/' + item._id
          }, function(err /*, response */) {
            if (err) {
              throw err;
            }
          });
          Posts.update({
            _id: item._id
          }, {
            $set: {
              tweeted: true
            }
          });
          console.log('Tweeting "' + item.title + '"');
        finished = true;
      }
    });
  };

  //post a new link every 10 minutes
  Meteor.setInterval(postHot, 10 * 60 * 1000);
}
