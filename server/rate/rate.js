Meteor.methods({
  // obj.id = content _id
  // obj.rate = score from 1-5
  // TODO: protect against inserting rating for non-existent content
  rate : function (obj) {
    "use strict";
    if (typeof obj !== 'undefined') {
      new Meteor.Error(500, 'Must include object with content ID and points');
    }

    if (typeof obj.id === 'undefined') {
      new Meteor.Error(500, 'ID must be included');
    }

    if (typeof obj.rate === 'undefined') {
      new Meteor.Error(500, 'Points must be included');
    }

    if (obj.rate <= 0 || obj.rate >= 1) {
      new Meteor.Error(500, 'Point value must be between 1 and 5');
    }

    console.log(
      Meteor.user().username + ' gave ' + obj.rate + ' points to ' + obj.id
    );

    var findRatingQuery = {
      'user'   : Meteor.userId()
    };

    var findRatingResult = Ratings.find(findRatingQuery);
    findRatingResult.fetch();

    var upsertRatingQuery = {
      '$set' : {}
    };

    upsertRatingQuery.$set['ratings.' + obj.id] = {
      time: new Date(),
      rate: obj.rate
    };

    return Ratings.upsert(findRatingQuery, upsertRatingQuery);
  }
});
