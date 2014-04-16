//var queue = new PowerQueue();
var hn = Meteor.require('hacker-news-api');

var readHn = function () {
  "use strict";
  console.log('Reading last 24 hours of Hacker News');
  var now = Date.now() / 1000;

  var query = 'search?tags=story&numericFilters=created_at_i>' +
  (now - 86400) + ',created_at_i<' +
  now;

  hn.call(query, Meteor.bindEnvironment(
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
          oldComments: parseInt(item.num_comments, 10),
        };

        Posts.upsert({
          oldId: obj.oldId
        },{
          $set: obj
        });

      });
    }, function (error) {
      throw error;
    })
  );
};

// read last 24 hours of hn
readHn();

// reread hn every hour
Meteor.setInterval(readHn, 3600 * 1000);
