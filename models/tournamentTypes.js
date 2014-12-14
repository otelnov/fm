var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
  'use strict';

  var TournamentTypesSchema = new Schema({
    title: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    type: { type: String, enum: [ 'championLeague', 'worldCup' ] }
  });

  mongoose.model('TournamentTypes', TournamentTypesSchema, 'TournamentTypes');
};






