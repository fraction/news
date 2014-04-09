var queue = new PowerQueue();

Meteor.methods({
  addRSS: function (url) {
    "use strict";
    queue.add(function(done) {
      HTTP.call("GET", url, {}, function (error) {
        if (error) {
          console.log(error);
        }

        done();
      });
    });
  }
});

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
  console.log('Reading all feeds')
  addFeed('http://www.reddit.com/.rss', 'reddit.com');
  addFeed('https://news.ycombinator.com/rss', 'news.ycombinator.com');
  addFeed('http://zenhabits.net/feed/', 'zenhabits.net');
  addFeed('http://www.datatau.com/rss', 'datatau.com');
  addFeed('http://feeds.feedburner.com/alistapart/main', 'alistapart.com');
  addFeed('http://www.brobible.com/feed/', 'brobible.com');
  addFeed('https://xkcd.com/atom.xml', 'xkcd.com');
};

// every ten minutes
console.log('Setting interval...');
readAllFeeds();
Meteor.setInterval(readAllFeeds, 1000 * 60 * 10);
