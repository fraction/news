'use strict';

Meteor.publish('votes', function () {
  return Votes.find({user: this.userId});
});
