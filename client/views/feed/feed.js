Template.feed.posts = function () {
  var posts = [];
  for (var i = 0; i < 15; i++) {
    posts.push({
      title: "Hello, world!",
      uri: "https://github.com/fraction/fraction",
      domain: "github.com"
    });
  }
  return posts;
}
