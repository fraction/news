var countVotes = function () {
  "use strict";

  var voteTable = [];

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

  _(Posts.find().fetch()).forEach(function (obj) {
    voteTable.push({
      id: obj._id,
      votes: count(obj)
    });
  });

  _(voteTable).forEach(function(item) {
    Posts.update({_id: item.id}, { $set: {votes: item.votes}});
  });
};


Meteor.startup(function () {
  countVotes();
});
