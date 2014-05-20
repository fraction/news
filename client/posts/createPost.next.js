'use strict';

Template.createPost.events({
  submit: (event) => {
    event.preventDefault();
    var title = $('form .title').val();
    var url =   $('form .url').val();
    Meteor.call('newPost', {
      title: title,
      url: url
    }, (err) => {
      if (err) {
        throw err;
      } else {
        document.location.href = '/';
      }
    });
  }
});
