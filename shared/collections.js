'use strict';

define('votes', [], function () {
  return new Meteor.Collection('votes');
});

define('posts', [], function () {
  return new Meteor.Collection('posts');
});
