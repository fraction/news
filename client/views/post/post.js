/*
// gets just the domain of a title
var getDomain = function (uri) {
  "use strict";
  return uri.replace('http://','').replace('https://','').split(/[/?#]/)[0];
};

// It'll take a sentence like this and make it
// itll-take-a-sentence-like-this-and-make-it
var cleanText = function (str) {
  "use strict";
  return str.replace(/[^\w\s]/gi, '').replace(/\W/g, "-").toLowerCase();
};
*/

Template.post.helpers({
  commentCopy: function() {
      "use strict";
      if (this.comments === 1) {
        return this.comments + ' comment';
      } else {
        return this.comments + ' comments';
      }
  }
});
