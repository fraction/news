// Casts a rating
var rate = function (event) {
  "use strict";
  event.preventDefault();
  var star = event.target;
  var post = star.parentElement.parentElement.parentElement.dataset.post;
  var starNum = event.target.dataset.num;
  console.log(post);
  var oldRating = $('div[data-post=' + post + ']').data('rating');
  $('div[data-post=' + post + '] .star').each(function () {
    if ($(this).data("num") <= starNum) {
      $(this).removeClass('fa-star-o').addClass('fa-star rate-' + starNum);
    } else {
      $(this).removeClass('fa-star rate-' + oldRating).addClass('fa-star-o');
    }
  });
};

Template.feed.events({
  'click .star': rate
});
