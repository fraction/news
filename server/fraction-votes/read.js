Meteor.publish('votes', function () {
  "use strict";
  return Votes.find({user: this.userId});
});

Meteor.methods({
  // obj.id = content _id
  // obj.vote = score from -1 to 1
  // TODO: protect against inserting vote for non-existent content
  countVotes : function (posts) {
    "use strict";
    if (typeof obj !== 'undefined') {
      new Meteor.Error(500, 'Must include posts with call');
    }
    var pointTable = [];

    var count = function (obj) {
      var countVotesQuery = {};
      countVotesQuery['votes.' + obj._id] = {
        '$exists' : true
      };

      var countVotesResult = Votes.find(countVotesQuery).fetch();
      var current = 0;

      _(countVotesResult).forEach(function (result) {
        current += result.votes[obj._id].vote;
      });

      return current;
    };

    _(posts).forEach(function (obj) {
      pointTable.push({
        id: obj._id,
        votes: count(obj)
      });
    });

    return pointTable;
  }
});
