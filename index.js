'use strict';

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');

const db = require('./lib/db');
const Build = require('./app/build');

const app = express();

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const values = {
    name:'',
    speed: 0,
    resolution: 0,
    curing: 0,
  }
  res.render('index', {values: {}, message: ''});
})

app.post('/', (req, res) => {
  const values = {
    name: req.body.name,
    speed: req.body.speed,
    resolution: req.body.resolution,
    curing: req.body.curing,  
  }

  if (values.name == null || values.speed == null || values.resolution == null || values.curing == null) {
    res.render('index', {values: values, message: 'All fields must be filled!'});
  }

  const build = Build(values);

  build.save().then(newBuild => {
    Build.find({}).exec().then(builds => {
      console.log(builds)
      res.redirect('/builds');  
    })
  })
})

app.get('/builds', (req, res) => {
  Build.find({}).then(builds => {
    console.log(builds);
    res.render('builds', {builds: builds});
  });
})

app.listen(8080, () => {
  console.log('BioBots Build Manager running on port 8080');
})