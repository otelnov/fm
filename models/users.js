var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
  'use strict';

  var UsersSchema = new Schema({
    name: String,
    surname: String,
    displayName: String,
    image: String,
    email: {
      type: String,
      unique: true,
      index: true,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    provider: String,
    providerId:  String,
    isEnabled: {
      type: Boolean,
      default: true
    }
  });

  mongoose.model('Users', UsersSchema, 'Users');
};






