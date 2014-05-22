'use strict';

Template.viewComment.helpers({
  cleanText : function () {
    // replace '\n' with a newline character
    return this.text.replace(/\\n/g, "\n");
  },
  timeCopy : function () {
    return Utilities.timeSince(new Date(this.created_at));
  }
});
