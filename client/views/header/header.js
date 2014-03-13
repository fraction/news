Template.header.links = function () {
  "use strict";
  var links = [];
  if (Meteor.userId() === null) {
    console.log(Meteor.userId());
    links.push({
      url: 'sign-in',
      text: 'Sign In'
    },{
      url: 'sign-up',
      text: 'Sign Up'
    });
  } else {
    console.log(Meteor.userId());
    links.push({
      url: 'post',
      text: 'Post'
    },{
      url: 'sign-out',
      text: 'Sign Out'
    });
  }
  return links;
};
