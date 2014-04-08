var queue = new PowerQueue();
queue.run();

var fp = Meteor.require('feedparser');

console.log(fp);

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
