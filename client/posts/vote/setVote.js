'use strict';

Meteor.subscribe('votes');

var vote = function (event) {
  var target = $(event.target);
  var post = target.parent().parent().parent().parent().parent();

  // assume the best
  var type   = '';
  var points = 0;

  if (target.hasClass('downvote')) {
    if (post.hasClass('downvoted')) {
      type   = 'nonvoted';
      points = 0;
    } else {
      type   = 'downvoted';
      points = -1;
    }
  }

  if (target.hasClass('upvote')) {
    if (post.hasClass('upvoted')) {
      type   = 'nonvoted';
      points = 0;
    } else {
      type   = 'upvoted';
      points = 1;
    }
  }

  // todo: select parent better

  post.attr('class', type + ' post');
  Meteor.call('vote', {
    id:   post.attr('data-id'),
    vote: points
  });
};

Template.setVote.events({
  'click .upvote, click .downvote' : vote
});
