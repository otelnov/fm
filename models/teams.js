var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
  'use strict';

  var TeamsSchema = new Schema({
    title: String,
    code: String,
    continent: String,
    country: String,
    city: String,
    isNational: Boolean,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });

  mongoose.model('Teams', TeamsSchema, 'Teams');
};






