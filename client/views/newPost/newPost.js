Template.newPost.events({
  'submit': function () {
    "use strict";
    event.preventDefault();
    var title = $('form .title').val();
    var url =   $('form .url').val();
    Meteor.call('newPost', {
      title: title,
      url: url
    }, function (err, result) {
      if (err) {
        throw err;
      } else {
        document.location.href = '/';
      }
    })
  }
});
