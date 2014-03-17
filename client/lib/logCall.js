Meteor.logCall = function (method, params) {
  Meteor.call(method, params, function (err, result) {
    if (err) console.log (err);
    console.log(result);
  });
}
