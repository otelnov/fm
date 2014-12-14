module.exports = function() {
  'use strict';

  require('./users')();
  require('./games')();
  require('./players')();
  require('./teams')();
  require('./tournaments')();
  require('./tournamentTypes')();

};