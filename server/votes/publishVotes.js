'use strict';

require('votes', function (Votes) {
  Meteor.publish('votes', function () {
    return Votes.find({user: this.userId});
  });
});
