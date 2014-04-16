//var queue = new PowerQueue();
var hn = Meteor.require('hacker-news-api');

Meteor.methods({
  "readHn": function () {
    "use strict";
    hn.getStories(Meteor.bindEnvironment(
      function (error, data) {
        if (error) {
          throw error;
        }
        _(data.hits).forEach(function (item) {
          /*jshint camelcase: false */
          var obj = {
            oldId: parseInt(item.objectID, 10),
            oldPoints: parseInt(item.points, 10),
            createdAt: new Date(item.created_at),
            site: 'hn',
            author: item.author,
            title: item.title,
            url: item.url,
            comments: parseInt(item.num_comments, 10),
          };

          Posts.upsert({
              oldId: obj.oldId
          },{ $set: obj });

        });
      }, function (e) {
        throw e;
      })
    );
  }
});
