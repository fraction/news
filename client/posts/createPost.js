Template.createPost.events({
  'submit': function (event) {
    "use strict";
    event.preventDefault();
    var title = $('form .title').val();
    var url =   $('form .url').val();
    Meteor.call('newPost', {
      title: title,
      url: url
    }, function (err) {
      if (err) {
        throw err;
      } else {
        document.location.href = '/';
      }
    });
  }
});
