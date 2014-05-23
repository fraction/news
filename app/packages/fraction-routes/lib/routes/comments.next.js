'use strict';

Routes.comments = {
  name: 'comments',
  controller: Routes.Controllers.page,
  path: '/comments/:id',
  template: 'listComments',
  waitOn: function () {
    if (Session.equals('sortType', undefined)) {
        Routes.hot.waitOn();
    }
    return Meteor.subscribe('comments', this.params.id);
  },
  onAfterAction: function () {
    Session.set('comments', Posts.find({
      _id: this.params.id
    }, {
      reactive: false
    }).fetch());

    Session.set('showComments', true);
    Session.set('currentView', 'Comments');

    if (Session.equals('sortType', undefined)) {
      Routes.hot.onAfterAction();
    }
  }
};
