//var queue = new PowerQueue();
var hn = Meteor.require('hacker-news-api');

var readHn = function () {
  "use strict";
  console.log('Reading last hour, 12 hours, 24 hours, and week of Hacker News');
  var now = Date.now() / 1000;
  var querylist = [];

  // past hour
  querylist.push('search?tags=story&numericFilters=created_at_i>' +
  (now - 60 * 60) + ',created_at_i<' +
  now);

  // past 12 hours
  querylist.push('search?tags=story&numericFilters=created_at_i>' +
  (now - 60 * 60 * 12) + ',created_at_i<' +
  now);

  // past 24 hours
  querylist.push('search?tags=story&numericFilters=created_at_i>' +
  (now - 60 * 60 * 24) + ',created_at_i<' +
  now);

  // past week
  querylist.push('search?tags=story&numericFilters=created_at_i>' +
  (now - 60 * 60 * 24 * 7) + ',created_at_i<' +
  now);

  // past month
  querylist.push('search?tags=story&numericFilters=created_at_i>' +
  (now - 60 * 60 * 24 * 30) + ',created_at_i<' +
  now);

  // past year
  querylist.push('search?tags=story&numericFilters=created_at_i>' +
  (now - 60 * 60 * 24 * 365) + ',created_at_i<' +
  now);

  // past ever
  querylist.push('search?tags=story&numericFilters=created_at_i>' +
  0 + ',created_at_i<' +
  now);

  _.forEach(querylist, function (query) {
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
  });
};

// read last 24 hours of hn
readHn();

// reread hn every half hour
Meteor.setInterval(readHn, 1800 * 1000);
