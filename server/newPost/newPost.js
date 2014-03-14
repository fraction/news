// Make sure there's no "javascript:alert()" douchebaggery
var isWebAddress = function (value) {
  return /^https?:\/\//i.test(value);
}

Meteor.methods({
  log: console.log,
  newPost : function (obj) {
    if (obj.title.length < 3) {
      throw 'Title must be longer than 3 characters'
    }
    if (isWebAddress(obj.url) === false) {
      throw 'URL must start with either "http://" or "https://"'
    }
    Posts.insert({
      time: new Date(),
      title: obj.title,
      url: obj.url,
      author: Meteor.userId(),
      comments: 0
    });
  }
});
