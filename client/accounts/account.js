Meteor.startup(function () {
  "use strict";
  AccountsEntry.config({
    privacyUrl:     '/privacy-policy',
    termsUrl:       '/terms-of-use',
    homeRoute:      '/',
    dashboardRoute: '/',
    profileRoute:   'settings'
  });
});
