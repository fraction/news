/*
// gets just the domain of a title
var getDomain = function (uri) {
  "use strict";
  return uri.replace('http://','').replace('https://','').split(/[/?#]/)[0];
};
*/

// It'll take a sentence like this and make it
// itll-take-a-sentence-like-this-and-make-it
var cleanText = function (str) {
  "use strict";
  return str.replace(/[^\w\s]/gi, '').replace(/\W/g, "-").toLowerCase();
};

Template.post.helpers({
  commentCopy: function() {
    "use strict";
    if (this.comments === 1) {
      return this.comments + ' comment';
    } else {
      return this.comments + ' comments';
    }
  },
  commentLink: function () {
    "use strict";
    return '/comments/' + this._id + '/' + cleanText(this.title);
  },
  previousVote: function () {
    "use strict";

    var post = this._id;
    var voteQuery = {
      'user'   : Meteor.userId()
    };
    voteQuery['votes.' + post] = {
      '$exists' : true
    };

    var voteResult = Votes.findOne(voteQuery);
    if (typeof voteResult !== 'undefined') {
      var vote = voteResult.votes[post].vote;
      if (vote > 0) {
        return 'upvoted';
      } else if (vote < 0) {
        return 'downvoted';
      } else {
        return 'nonvoted';
      }
    } else {
      return 'nonvoted';
    }
  }
});
