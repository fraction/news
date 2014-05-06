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

  var i = 0;
  _.forEach(voteTable, function (value, key) {
    Posts.update({_id: key}, { $inc: {votes: value}});
    i++;
  });


  if (i > 0) {
    var str = 'Applying ' + i + ' vote';
    if (i > 1) {
      str += 's';
    }
    console.log(str);
  }
};

Meteor.startup(countVotes);

// run every 5 seconds
Meteor.setInterval(countVotes, 5 * 1000);
