// gets just the domain of a title
var getDomain = function (uri) {
  "use strict";
  return uri.replace('http://','').replace('https://','').split(/[/?#]/)[0];
};

// 7 comments, 1 comment.
var pluralizeComment = function (num) {
  "use strict";
  if (num === 1) {
    return num + ' comment';
  } else {
    return num + ' comments';
  }
};

// It'll take a sentence like this and make it
// itll-take-a-sentence-like-this-and-make-it
var cleanText = function (str) {
  "use strict";
  return str.replace(/[^\w\s]/gi, '').replace(/\W/g, "-").toLowerCase();
};

// fake titles to be removed later
var postTitles = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Duis sit amet felis turpis. Integer nec accumsan arcu.',
  'Phasellus volutpat purus ac augue sagittis posuere.',
  'Ut tempus vehicula ligula sit amet fermentum.',
  'Fusce eget posuere turpis.',
  'Vivamus placerat id enim ac consectetur.',
  'Integer quis libero a arcu tempus fermentum nec sit amet risus.',
  'Integer tempus, erat ultricies facilisis consectetur, leo lacus eleifend.'
];

// generates fake post data
var fakeData = function (id, link, author) {
  "use strict";
  var title = postTitles[id];
  var commentNum = Math.ceil((Math.random()*10)+1);
  var starNum = Math.ceil((Math.random()*5));
  console.log(starNum);
  var starArr = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= starNum) {
      starArr.push({
        type: 'fa-star',
        label: 'star-' + i
      });
    } else {
      starArr.push({
        type: 'fa-star-o',
        label: 'star-' + i
      });
    }
  }

  return {
    id: id,
    title: title,
    uri: link,
    domain: getDomain(link),
    comments: pluralizeComment(commentNum),
    commentLink: '/comments/' + id + '/' + cleanText(title),
    author: author,
    authorLink: '/user/' + author.toLowerCase(),
    stars: starArr
  };
};

// Called when a user clicks on an upvote or downvote
var vote = function (event) {
  "use strict";
  event.preventDefault();
  var id = event.target.dataset.post;
  var target = $(event.target);
  var direction, inverse;
  if (target.hasClass('upvote')) {
    direction = 'up';
    inverse   = 'down';
  } else if (target.hasClass('downvote')) {
    direction = 'down';
    inverse   = 'up';
  }
  if (target.hasClass(direction + 'voted')) {
    target.removeClass(direction + 'voted');
  } else {
    target.addClass(direction + 'voted');
    var opposite = $('.' + inverse + 'vote[data-post=' + id + ']');
    if (opposite.hasClass(inverse + 'voted')) {
      opposite.removeClass(inverse + 'voted');
    }
  }
};


// throw together some sample data
Template.feed.posts = function () {
  "use strict";
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
};

Template.feed.events({
  'click .upvote, click .downvote': vote
});
