Template.newPost.events({
  'submit': function () {
    event.preventDefault();
    var title = $('form .title').val();
    var url =   $('form .url').val();
    Posts.insert({title: title, url: url});
    document.location.href = '/';
  }
});
