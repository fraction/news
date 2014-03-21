Meteor.publish('votes', function () {
  "use strict";
  return Votes.find({user: this.userId});
});
