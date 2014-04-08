Template.header.links = function () {
  "use strict";
  var links = [];
  if (Meteor.userId() === null) {
    links.push({
      url: 'sign-in',
      text: 'Sign In'
    },{
      url: 'sign-up',
      text: 'Sign Up'
    });
  } else {
    links.push({
      url: 'new-post',
      text: 'Post'
    },{
      url: 'sign-out',
      text: 'Sign Out'
    });
  }
  return links;
};

Template.wrapper.loggingIn = function () {
  return Meteor.loggingIn();
}
