var countVotes = function () {
  "use strict";

  var count = function () {
    // find votes for object
    var deltaVotesQuery = {
      delta: {
        $exists: true
      }
    };



    var deltaVotes = Votes.find(deltaVotesQuery).fetch();
    console.log(deltaVotes);

    var current = 0;
/*
    // count how many votes each object has
    _(countVotesResult).forEach(function (result) {
      console.log('found delta vote');
      current += result.votes[obj._id].vote;
    });
*/
    return current;
  };

  count();
/*
  _(Posts.find().fetch()).forEach(function (obj) {
    voteTable.push({
      id: obj._id,
      votes: count(obj)
    });
  });
*/
//  _(voteTable).forEach(function(item) {
//    Posts.update({_id: item.id}, { $set: {votes: item.votes}});
//  });
};


Meteor.startup(function () {
  countVotes();
});

Meteor.setInterval(countVotes, 10*1000)
