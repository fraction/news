// Casts a rating
var rate = function (event) {
  "use strict";
  event.preventDefault();
  var star = event.target;
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

};

Template.stars.events({
  'click .star': rate
});

Template.stars.stars = function () {
  result = [];
  _.times(5, function(n) {
    result.push({
      type: 'fa-star-o',
      num:  n + 1
    })
  });
  return result;
};
