//var queue = new PowerQueue();
var hn = Meteor.require('hacker-news-api');

Meteor.methods({
  "readHackerNews": function () {
    "use strict";
    hn.getStories(Meteor.bindEnvironment(
      function (error, data) {
        if (error) {
          throw error;
        }
        _(data.hits).forEach(function (item) {
          /*jshint camelcase: false */
          console.log(item);
          var obj = {
            oldId: '2922756',
            oldPoints: item.points,
            createdAt: new Date(item.created_at),
            site: 'hn',
            author: item.author,
            title: item.title,
            url: item.url,
            comments: item.num_comments,
          };

          Posts.insert(obj, function (err, res) {
            if (err) {
              throw err;
            }
            console.log(res);
          });
        });
      }, function (e) {
        throw e;
      })
    );
  }
});

Meteor.setInterval(readAllFeeds, 1000 * 60 * 10);
