var hn = Meteor.require('hacker-news-api');

var readHn = function (before) {
  "use strict";
  console.log('Reading the past ' + before + ' seconds of Hacker News');
  var now = Math.floor(Date.now() / 1000);
  var query = 'search?tags=story&numericFilters=created_at_i>';
  query    += (now - before) + ',created_at_i<' + now;

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

Meteor.setInterval(function () {
  "use strict";
  readHn(60);                    // top for the minute
  readHn(60 * 60);               // top for the hour
  readHn(24 * 60 * 60);          // top for the day
  readHn(7 * 24 * 60 * 60);      // top for the week
}, 60 * 1000);                   // every minute

Meteor.setInterval(function () {
  "use strict";
  readHn(Math.floor(Date.now() / 1000)); // top ever
  readHn(7 * 24 * 60 * 60);              // top for the week
}, 60 * 60 * 1000);                      // every hour
