Template.feed.posts = function () {
  var posts = [];
  for (var i = 0; i < 5; i++) {
    posts.push({
      title: "Hello, world!",
      uri: "#"
    });
  }
  return posts;
}
