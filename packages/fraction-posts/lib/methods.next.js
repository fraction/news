'use strict';

Meteor.methods({
  createPost : (obj) => {
    // disabled
    return obj;
  }
});

/*
    var isWebAddress = function (value) {
      return (/^https?:\/\//i).test(value);
    };

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
  */
