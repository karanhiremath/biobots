'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/biobots');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

module.exports = db;