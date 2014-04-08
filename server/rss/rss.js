var queue = new PowerQueue();
queue.run();


Meteor.methods({
  addRSS: function (url) {
    "use strict";
    queue.add(function(done) {
      console.log(url);
      HTTP.call("GET", url, {}, function (error, result) {
        if (error) {
          throw error;
          done();
        } else {
          console.log('done!')
          console.log(result);
          done();
        }
      });
    });
  }
});
