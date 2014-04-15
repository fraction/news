//var queue = new PowerQueue();
var hn = Meteor.require('hacker-news-api');

Meteor.methods({
  "refreshHackerNews": function () {
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


/*
var FeedParser = Meteor.require('feedparser');
var request = Meteor.require('request');
var Fiber = Meteor.require('fibers');

var readFeed = function (url, domain) {
  "use strict";
  console.log('Reading feed from ' + domain);
  var req = request(url);
  var feedparser = new FeedParser();
  req.on('error', function (error) {
    console.log(error);
  }).on('response', function (res) {
    var stream = this;
    if (res.statusCode !== 200) {
      return this.emit('error', new Error('Bad status code'));
    }
    stream.pipe(feedparser);
  });

  feedparser.on('error', function(error) {
    console.log('shit: ' + error);
  });

  feedparser.on('readable', function() {
    var stream = this;

    var item = stream.read();

    var parseFeed = function() {
      var obj = {};
      if (typeof item.title !== 'undefined') {
        obj.title = item.title;
      }
      if (item.origlink !== null) {
        obj.url = item.origlink;
      } else if (item.link !== null){
        obj.url = item.link;
      } else {
        throw 'something bad happened: ' + item;
      }

    //  if (item.pubDate != null) {
    //    obj.time = new Date(item.pubDate)
    //  } else {
      obj.time = new Date();
    //  }
      obj.username = domain;
      obj.comments = 0;

      if (typeof Posts.findOne({url: obj.url}) === 'undefined') {
        console.log('Posted "' + obj.title + '" from ' + obj.username);
        Posts.insert(obj);
      }
    };

    while (item) {
      Fiber(parseFeed).run();
      item = stream.read();
    }
  });
};


var addFeed = function (url, domain) {
  "use strict";
  queue.add(function(done) {
    readFeed(url, domain);
    done();
  });
};

// reads each and every feed
var readAllFeeds = function () {
  "use strict";
  console.log('Reading all feeds');
  addFeed('https://news.ycombinator.com/rss', 'news.ycombinator.com');
};

// every ten minutes
console.log('Setting interval...');
readAllFeeds();
Meteor.setInterval(readAllFeeds, 1000 * 60 * 10);

*/
