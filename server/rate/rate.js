Meteor.methods({
  // obj.id = content _id
  // obj.rate = score from 1-5
  // TODO: protect against inserting rating for non-existent content
  rate : function (obj) {
    "use strict";
    if (typeof obj === 'undefined') {
      throw 'Must include object with content ID and rating';
    }

    if (typeof obj.id === 'undefined') {
      throw 'ID must be included';
    }

    if (typeof obj.rate === 'undefined') {
      throw 'Rating must be included';
    }

    if (obj.rate < 1 || obj.rate > 5) {
      throw 'Rating must be between 1 and 5';
    }

    var findUserQuery = {};
    findUserQuery[Meteor.userId()] = {
      $exists: true
    };

    var findUser = Ratings.findOne(findUserQuery);
    if (typeof findUser === 'undefined') {
      var insertion = {};
      insertion[Meteor.userId()] = {}
      Ratings.insert(insertion);
    }

    var updateRatingsQuery = {};
    updateRatingsQuery[obj.id] = {
      time: new Date(),
      rate: obj.rate
    };

    Ratings.update(findUserQuery, updateRatingsQuery, {
      upsert: true,
      multi: false
    });
  }
});
