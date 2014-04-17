var countVotes = function () {
  "use strict";
  // find votes for object
  var deltaVotesQuery = {
    delta: {
      $exists: true
    }
  };

  var deltaVotes = Votes.find(deltaVotesQuery).fetch();

  var voteTable = {};

  // count how many votes each object has
  _.forEach(deltaVotes, function (vote) {
      var post = voteTable[vote.obj];
      if (typeof post === 'undefined') {
        // first vote for this post
        voteTable[vote.obj] = vote.delta;
      } else {
        // not first vote for the post
        voteTable[vote.obj] += vote.delta;
      }
      Votes.update({
        _id: vote._id
      }, {
        $unset : {
          delta: ''
        }
      });
    });

  _.forEach(voteTable, function (value, key) {
    Posts.update({_id: key}, { $inc: {votes: value}});
  });

  console.log('Counting votes:', voteTable);
};


Meteor.startup(countVotes);

// run every 2 minutes
Meteor.setInterval(countVotes, 2*1000);
