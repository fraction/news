'use strict';

Meteor.publish('votes', () => {
  return Votes.find({user: this.userId});
});
