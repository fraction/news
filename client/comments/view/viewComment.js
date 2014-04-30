Template.viewComment.helpers({
  'cleanText' : function () {
    "use strict";
    // replace '\n' with a newline character
    return this.text.replace(/\\n/g, "\n");
  }
});
