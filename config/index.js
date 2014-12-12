var mongoose   = require('mongoose');

module.exports = function (app) {
  'use strict';

  var config = require('config');
  app.set('config', config);

  mongoose.connect(config.server.MONGO_DB);

};