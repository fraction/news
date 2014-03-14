Meteor.methods({
  rate : function (obj) {
    "use strict";
    var findUserQuery = {};
    findUserQuery[Meteor.userId()] = {
      $exists: true
    };

    var findUser = Ratings.findOne(findUserQuery);
    if (typeof findUser === 'undefined') {
      var insertion = {};
      insertion[Meteor.userId()] = 'hey'
      Ratings.insert(insertion);
    }
  }
});
