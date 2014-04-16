sortHistory = new Meteor.Collection('sortHistory');

/*
This keeps track of how often we've been doing our sorts. Ideally, we should
be able to sort every minute or so without any sort of problems.

[{
createdAt: new Date(),
sortType: 'top',
duration: 117 // milliseconds
}]
*/

var sortTop = function (lastSort, startTime) {
  console.log('Adding last few minutes of votes');

  console.log(lastSort);

  var findVoteQuery = {
    'time': {
      $gt: new Date(lastSort)
    }
  };

  console.log(Votes.find(findVoteQuery).fetch());
}

Meteor.startup(function () {
//  sortTop((Date.now() / 1000) - 60, Date.now());
})
