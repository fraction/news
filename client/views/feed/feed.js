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
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit ligula sit amet.',
  'Duis sit amet felis turpis. Integer nec accumsan arcu volutpat purus ague.',
  'Phasellus volutpat purus ac augue sagittis posuere.',
  'Ut tempus vehicula ligula sit amet fermentum.',
  'Fusce eget posuere turpis enim purus turpis sit amet arcu a libero.',
  'Vivamus placerat id enim ac consectetur.',
  'Integer quis libero a arcu tempus fermentum nec sit amet risus.',
  'Integer tempus, erat ultricies facilisis consectetur, leo lacus eleifend.'
];

// generates fake post data
var fakeData = function (id, link, author) {
  "use strict";
  var title = postTitles[id];
  var commentNum = Math.ceil((Math.random()*100)+1);
  var starNum = 0;
  var starArr = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= starNum) {
      starArr.push({
        num:   i,
        type:  'fa-star'
      });
    } else {
      starArr.push({
        num:  i,
        type: 'fa-star-o'
      });
    }
  }

  var url = link + '?' + commentNum + '=' + cleanText(title);

  return {
    id: id,
    title: title,
    uri: url,
    domain: getDomain(link),
    comments: pluralizeComment(commentNum),
    commentLink: '/comments/' + id + '/' + cleanText(title),
    author: author,
    authorLink: '/user/' + author.toLowerCase(),
    stars: starArr,
    rating: 0
  };
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
        'SomeBody'
        )
      );
  }
  return posts;
};
