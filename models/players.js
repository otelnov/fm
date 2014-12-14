var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
  'use strict';

  var PlayersSchema = new Schema({
    name: String,
    surname: String,
    team: {
      type: Schema.Types.ObjectId,
      index: true,
      ref: "Teams"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });

  mongoose.model('Players', PlayersSchema, 'Players');
};






