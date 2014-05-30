'use strict';

if (process.env.NODE_ENV === 'production') {
  var Twit =    Npm.require('twit');
  var twitter = new Twit({
    consumer_key:         process.env.TWIT_KEY,
    consumer_secret:      process.env.TWIT_SECRET,
    access_token:         process.env.TWIT_TOKEN,
    access_token_secret:  process.env.TWIT_TOKEN_SECRET
  });

  var tweetHot = () => {
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
    _(hot).forEach((item) => {
      // it hasn't been tweeted yet
      if (finished === false && (typeof item.tweeted === 'undefined')) {
        twitter.post('statuses/update',
        {
          status: item.title + 'http://beta.fraction.io/comments/' + item._id
        }, (err /*, response */) => {
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

  //post a new link every 20 minutes
  Meteor.setInterval(tweetHot, 20 * 60 * 1000);
}
