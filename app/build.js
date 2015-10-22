'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buildSchema = new Schema({
  name: String,
  speed: Number,
  resolution: Number,
  curing: Number,
  created_at: Date,
  updated_at: Date
});

buildSchema.pre('save', next => {
  const currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;