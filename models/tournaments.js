var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
  'use strict';

  var TournamentsSchema = new Schema({
    title: String,
    creator: String,
    tournamentType: {
      type: Schema.Types.ObjectId,
      index: true,
      ref: "TournamentTypes"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    teams: [{
      type: Schema.Types.ObjectId,
      index: true,
      ref: "Teams"
    }],
    stage: { type: String, enum: [ 'qualification', 'playoff', 'group' ] },
    status: { type: String, enum: [ 'inProgress', 'closed' ] }
  });

  mongoose.model('Tournaments', TournamentsSchema, 'Tournaments');
};






