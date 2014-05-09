'use strict';
require('votes', function (Votes) {
  // adapted from http://stackoverflow.com/a/3177838
  // todo: move to an actual lib... again
  var timeSince = function (date) {
    var timeString = function (int, str) {
      return int + str;
    };

    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 0) {
      return timeString(interval, 'y');
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 0) {
      return timeString(interval, 'mo');
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 0) {
      return timeString(interval, 'd');
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 0) {
      return timeString(interval, 'h');
    }
    interval = Math.floor(seconds / 60);
    if (interval > 0) {
      return timeString(interval, 'min');
    }
    return timeString(interval, 'second');
  };

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
      return timeSince(this.createdAt);
    },
    totalPoints: function () {
      return this.oldPoints + Session.get('vote.' + this._id);
    },
    authorLink: function() {
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
});
