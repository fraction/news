// gets just the domain of a title
var getDomain = function (uri) {
  return uri.replace('http://','').replace('https://','').split(/[/?#]/)[0];
}

// 7 comments, 1 comment.
var pluralizeComment = function (num) {
  if (num == 1) {
    return num + ' comment'
  } else {
    return num + ' comments'
  }
}

// It'll take a sentence like this and make it
// itll-take-a-sentence-like-this-and-make-it
var cleanText = function (str) {
  return str.replace(/[^\w\s]/gi, '').replace(/\W/g, "-").toLowerCase();
}

// fake titles to be removed later
var postTitles = [
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
'Duis sit amet felis turpis. Integer nec accumsan arcu.',
'Phasellus volutpat purus ac augue sagittis posuere.',
'Ut tempus vehicula ligula sit amet fermentum.',
'Fusce eget posuere turpis.',
'Vivamus placerat id enim ac consectetur.',
'Integer quis libero a arcu tempus fermentum nec sit amet risus.',
'Integer tempus, erat ultricies facilisis consectetur, leo lacus eleifend turpis, at cursus est diam a eros.'
];

// generates fake post data
var fakeData = function (id, link, author) {
  var commentNum = Math.floor((Math.random()*10)+1);
  var title = postTitles[id];
  return {
    id: id,
    title: title,
    uri: link,
    domain: getDomain(link),
    comments: pluralizeComment(commentNum),
    commentLink: '/comments/' + id + '/' + cleanText(title),
    author: author,
    authorLink: '/user/' + author.toLowerCase()
  };
}

// Called when a user clicks on an upvote or downvote
var vote = function (event) {
  event.preventDefault();
  var id = event.target.dataset.post;
  var target = $(event.target);
  if (target.hasClass('upvote')) {
    if (target.hasClass('upvoted')) {
      target.removeClass('upvoted');
    } else {
      target.addClass('upvoted');
      var downvote = $('.downvote[data-post=' + id + ']');
      if (downvote.hasClass('downvoted')) {
        downvote.removeClass('downvoted');
      }
    }
  } else if (target.hasClass('downvote')) {
    if (target.hasClass('downvoted')) {
      target.removeClass('downvoted');
    } else {
      target.addClass('downvoted');
      var downvote = $('.upvote[data-post=' + id + ']');
      if (downvote.hasClass('upvoted')) {
        downvote.removeClass('upvoted');
      }
    }
  }
}


// throw a bunch of posts together – in the future this will pull from the database
Template.feed.posts = function () {
  var posts = [];
  for (var i = 0; i < postTitles.length; i++) {
    posts.push(
      fakeData(
        i,
        'https://github.com/fraction/fraction',
        'Anonymous'
      )
    );
  }
  return posts;
}

Template.feed.events({
  'click .upvote, click .downvote': vote
});
