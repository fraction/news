'use strict';

Meteor.startup(function () {
  AccountsEntry.config({
    privacyUrl:     '/privacy-policy',
    termsUrl:       '/terms-of-use',
    homeRoute:      '/',
    dashboardRoute: '/',
    profileRoute:   'settings',
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });
});
