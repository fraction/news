Template.viewComment.helpers({
  'cleanText' : function () {
    // replace '\n' with a newline character
    return this.text.replace(/\\n/g, "\n");
  }
});
