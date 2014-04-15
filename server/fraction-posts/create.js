// Make sure there's no "javascript:alert()" douchebaggery
var isWebAddress = function (value) {
  "use strict";
  return (/^https?:\/\//i).test(value);
};

Meteor.methods({
  newPost : function (obj) {
    "use strict";
    if (obj.title.length < 3) {
      throw 'Title must be longer than 3 characters';
    }
    if (isWebAddress(obj.url) === false) {
      throw 'URL must start with either "http://" or "https://"';
    }


    Posts.insert({
      time: new Date(),
      title: obj.title,
      url: obj.url,
      author: Meteor.userId(),
      username: Meteor.user().username,
      comments: 0
    });
  }
});
