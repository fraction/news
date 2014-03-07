Template.header.events({
  'click h1': function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the title!");
    }
});
