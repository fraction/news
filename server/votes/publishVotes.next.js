'use strict';

require('votes', (Votes) => {
  Meteor.publish('votes', () => {
    return Votes.find({user: this.userId});
  });
});
