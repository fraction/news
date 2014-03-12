// Called when a user clicks on an upvote or downvote
var vote = function (event) {
  "use strict";
  event.preventDefault();
  console.log('wow')
};

Template.feed.events({
  'click .upvote, click .downvote': vote
});
