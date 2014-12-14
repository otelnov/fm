var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
  'use strict';

  var GamesSchema = new Schema({
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
      team: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: "Teams"
      },
      host: Boolean
    }],
    status: { type: String, enum: [ 'waiting', 'inProgress', 'closed' ] },
    results: {
      homeGoals: [{
        player:{
          type: Schema.Types.ObjectId,
          index: true,
          ref: "Players"
        },
        isPenalty: Boolean,
        time: Date
      }],
      guestGoals: [{
        player:{
          type: Schema.Types.ObjectId,
          index: true,
          ref: "Players"
        },
        isPenalty: Boolean,
        time: Date
      }]
    },
    params: {
      yellow: [{
        type: Schema.Types.ObjectId,
        index: true,
        ref: "Players"
      }],
      red: [{
        type: Schema.Types.ObjectId,
        index: true,
        ref: "Players"
      }],
      additionalTime: Boolean,
      penalties: Boolean
    }
  });

  mongoose.model('Games', GamesSchema, 'Games');
};






