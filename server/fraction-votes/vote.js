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
      'user'   : Meteor.userId()
    };

    var findVoteResult = Votes.find(findVoteQuery);
    findVoteResult.fetch();

    var upsertVoteQuery = {
      '$set' : {}
    };

    upsertVoteQuery.$set['votes.' + obj.id] = {
      time: new Date(),
      vote: obj.vote
    };

    return Votes.upsert(findVoteQuery, upsertVoteQuery);
  }
});
