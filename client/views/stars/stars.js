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
    console.log(oldRating);
    if ($(this).data("num") <= starNum) {
      $(this)
      .removeClass('fa-star-o rate-' + oldRating)
      .addClass('fa-star rate-' + starNum);
    } else {
      console.log(oldRating);
      $(this)
      .removeClass('fa-star rate-' + oldRating)
      .addClass('fa-star-o');
    }
  };
  $('div[data-post=' + post + '] .star').each(setStarHighlight);
};

Template.feed.events({
  'click .star': rate
});
