Meteor.subscribe('ratings');

// Saves stars
var star = function (event) {
  "use strict";
  var star = event.target;
  var post = star.parentElement.parentElement.parentElement.dataset.post;

  var post = star.parentElement.parentElement.parentElement.dataset.post;
  var starNum = event.target.dataset.num;
  var oldRating = $('div[data-post=' + post + ']').attr('data-rating');
  $('div[data-post=' + post + ']').attr('data-rating', starNum);
  var setStarHighlight = function () {
    var jThis = $(this);
    if (jThis.data("num") <= starNum) {
      jThis
      .removeClass('fa-star-o rate-' + oldRating)
      .addClass('fa-star rate-' + starNum);
    } else {
      jThis
      .removeClass('fa-star rate-' + oldRating)
      .addClass('fa-star-o');
    }
  };
  $('div[data-post=' + post + '] .star').each(setStarHighlight);
  Meteor.call('rate', {
    id:   $('div[data-post=' + post + ']').attr('data-post'),
    rate: $('div[data-post=' + post + ']').attr('data-rating')
  });
};

Template.stars.events({
  'click .star': star
});

Template.stars.stars = function () {
  "use strict";
  var result = [];
  var post = this['_id'];
  var id   = Meteor.userId();

  var ratingsQuery = {};
  ratingsQuery[id + '.' + post] = {
    $exists: true
  };
  var ratingsResult = Ratings.findOne(ratingsQuery);
  console.log(ratingsResult);

  if (typeof ratingsResult !== 'undefined') {
    var stars = ratingsResult[id][post]['rate'];
  } else {
    stars = 0;
  }

  console.log(stars);
  var count = 0;
  var starsLeft = stars;

  _.times(5, function(n) {
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
