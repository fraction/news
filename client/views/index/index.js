Meteor.startup(function () {
  AccountsEntry.config({
    privacyUrl:     '/privacy-policy',
    termsUrl:       '/terms-of-use',
    homeRoute:      '/',
    dashboardRoute: '/',
    profileRoute:   'settings'
  });
});
