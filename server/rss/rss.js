var queue = new PowerQueue();


Meteor.methods({
  addRSS: function (url) {
    "use strict";
    queue.add(function(done) {
      console.log(url);
      HTTP.call("GET", url, {}, function (error, result) {
        if (error) {
          console.log(error);
          done();
        } else {
          console.log(fp(result));
          done();
        }
      });
    });
  }
});


var FeedParser = Meteor.require('feedparser')
  , request = Meteor.require('request')
  , Fiber = Meteor.require('fibers');

// example


Meteor.startup(function () {
  var req = request('http://theglitterguide.com/feed/')
    , feedparser = new FeedParser();
  req.on('error', function (error) {
    console.log(error);
  }).on('response', function (res) {
    var stream = this;
    var stream = this;
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    stream.pipe(feedparser);
  });

  feedparser.on('error', function(error) {
    console.log('shit')
  });
  feedparser.on('readable', function() {
    var stream = this, item;

    while (item = stream.read()) {
      Fiber(function() {
        var obj = {};
        if (typeof item.title !== 'undefined') {
          obj.title = item.title;
        }
        if (item.origlink != null) {
          obj.url = item.origlink
        } else if (item.link != null){
          obj.url = item.link;
        }

        console.log(item.link);

        obj.time = new Date();
        obj.author = 'theglitterguide.com';
        obj.username = 'theglitterguide.com';
        obj.comments = 0;

        Posts.insert(obj);
        console.log('');
      }).run();
    }
  });
});
