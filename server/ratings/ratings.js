Meteor.publish('ratings', function () {
  "use strict";
  var id = this.userId;
  var ratingsQuery = {};
  ratingsQuery[id] = {
    $exists: true
  };
  var result = Ratings.find(ratingsQuery);
  return result;
});
