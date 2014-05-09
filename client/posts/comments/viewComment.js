'use strict';

// adapted from http://stackoverflow.com/a/3177838
var timeSince = function (date) {
  var timeString = function (int, str) {
    return int + str;
  };

  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 0) {
    return timeString(interval, 'y');
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 0) {
    return timeString(interval, 'mo');
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 0) {
    return timeString(interval, 'd');
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 0) {
    return timeString(interval, 'h');
  }
  interval = Math.floor(seconds / 60);
  if (interval > 0) {
    return timeString(interval, 'min');
  }
  return timeString(interval, 's');
};

Template.viewComment.helpers({
  'cleanText' : function () {
    // replace '\n' with a newline character
    return this.text.replace(/\\n/g, "\n");
  },
  'timeCopy' : function () {
    /*jshint camelcase: false */
    return timeSince(new Date(this.created_at));
  }
});
