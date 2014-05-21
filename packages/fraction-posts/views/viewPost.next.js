'use strict';

Template.viewPost.helpers({
  previousVote: function () {
    var post = this._id;
    var voteQuery = {
      'user' : Meteor.userId(),
      'obj'  : post
    };

    var voteResult = Votes.findOne(voteQuery);
    if (typeof voteResult !== 'undefined') {
      var vote = voteResult.vote;
      if (vote > 0) {
        Session.set('vote.' + post, 1);
        return 'upvoted';
      } else if (vote < 0) {
        Session.set('vote.' + post, -1);
        return 'downvoted';
      } else {
        Session.set('vote.' + post, 0);
        return 'nonvoted';
      }
    } else {
      Session.set('vote.' + post, 0);
      return 'nonvoted';
    }
  },
  timeCopy: function () {
    return Utilities.timeSince(this.createdAt);
  },
  totalPoints: function () {
    return this.oldPoints + Session.get('vote.' + this._id);
  },
  authorLink: function () {
    return '/user/' + this.author;
  },
  commentLink: function () {
    return '/comments/' + this._id;
  },
  text: function () {
    return this.hnText;
  },
  domain: function () {
    var d = this.url.replace('http://','');
    d = d.replace('https://','').split(/[/?#]/)[0];

    // if it starts with "www.", remove it
    if (d.indexOf('www.') === 0) {
      d = d.substring(4, d.length);
    }
    return d;
  },
  community: function () {
    if (this.site === 'hn') {
      return 'Hacker News';
    }
  },
  communityLink: function () {
    if (this.site === 'hn') {
      return 'http://news.ycombinator.com/';
    }
  }
});
