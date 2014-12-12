module.exports = function (app) {
  'use strict';

  var config = app.get('config');
  var router = app.get('router');

  require('./users')(app);
  //require('./page')(app);

};