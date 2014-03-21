Meteor.subscribe('ratings');

// Saves stars
/*
Template.stars.stars = function () {
  "use strict";
  var result = [];
  var post = this._id;

  var ratingsQuery = {
    'user'   : Meteor.userId()
  };
  ratingsQuery['ratings.' + post] = {
    '$exists' : true
  };

  var ratingsResult = Ratings.findOne(ratingsQuery);

  var stars = 0;
  if (typeof ratingsResult !== 'undefined') {
    stars = ratingsResult.ratings[post].rate * 4 + 1;
  }

  var count = 0;
  var starsLeft = stars;

  _.times(5, function() {
    if (starsLeft > 0) {
      result.push({
        type: 'fa-star rate-' + stars,
        num:  count + 1
      });
      count++;
      starsLeft--;
    } else {
      result.push({
        type: 'fa-star-o',
        num:  count + 1
      });
      count++;
    }
  });
  return result;
};
*/
