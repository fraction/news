Meteor.publish('ratings', function () {
  "use strict";
  var result = Ratings.find({user: this.userId});
  return result;
});
