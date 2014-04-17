Meteor.methods({
  // obj.id = content _id
  // obj.vote = score from -1 to 1
  // TODO: protect against inserting vote for non-existent content
  vote : function (obj) {
    "use strict";
    if (typeof obj !== 'undefined') {
      new Meteor.Error(500, 'Must include object with content ID and vote');
    }

    if (typeof obj.id === 'undefined') {
      new Meteor.Error(500, 'ID must be included');
    }

    if (typeof obj.vote === 'undefined') {
      new Meteor.Error(500, 'Vote must be included');
    }

    if (obj.vote === -1 || obj.vote === 1) {
      // todo: remove this limit when third-party extensions are allowed
      new Meteor.Error(500, 'Vote value must be either -1 or 1');
    }

    console.log(
      Meteor.user().username + ' gave ' + obj.vote + ' points to ' + obj.id
    );

    var findVoteQuery = {
      'user'   : Meteor.userId(),
      'obj'    : obj.id
    };

    var oldVote = 0;
    var findVoteResult = Votes.findOne(findVoteQuery);

    if (typeof findVoteResult !== 'undefined') {
      // user has voted on this before
      oldVote = findVoteResult.vote;
      if (typeof findVoteResult.delta !== 'undefined') {
        //user has voted and it hasn't been saved yet
        oldVote -= findVoteResult.delta;
      }
    }

    var currentTime = new Date();

    var upsertVoteQuery = {
      '$set' : {
        time: currentTime,
        user: Meteor.userId(),
        obj: obj.id,
        vote: obj.vote,
        delta: obj.vote - oldVote
      }
    };

    return Votes.upsert(findVoteQuery, upsertVoteQuery);
  }
});
