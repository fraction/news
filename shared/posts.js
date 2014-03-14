/* global Posts:true */

Posts = new Meteor.Collection('posts');

var postsDemo = {
    "time":     new Date(),
    "title":    "I'm a title!",
    "url":      "http://fraction.io/",
    "author":   "christianbundy",
    "comments": "0"
};
