// Casts a rating
var rate = function (event) {
  "use strict";
  event.preventDefault();
  var star = event.target;
  var post = star.parentElement.parentElement.parentElement.dataset.post;
  var starNumber = event.target.dataset.number;
  var oldRating = $('div[data-post=' + post + ']').attr('data-rating');
  $('div[data-post=' + post + ']').attr('data-rating', starNumber);
  var setStarHighlight = function () {
    var jThis = $(this);
    if (jThis.data("number") <= starNumber) {
      jThis
      .removeClass('fa-star-o rate-' + oldRating)
      .addClass('fa-star rate-' + starNumber);
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

Template.stars.type = function () {

};

Template.stars.number = function () {

};
