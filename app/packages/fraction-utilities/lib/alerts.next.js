'use strict';

var levels = ['success', 'info', 'warning', 'danger'];

var createAlert = (level) => {
  Handlebars.registerHelper(level, (title, msg) => {
    var str = '<strong>' + title + '</strong> ' + msg;
    return '<div class="alert alert-' + level + '">' + str + '</div>';
  });
};

levels.forEach(createAlert);
