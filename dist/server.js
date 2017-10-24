'use strict';

// import express from 'express'; <= can go back to this after project is finished
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
require('dotenv').config({ path: '../.env' });

var app = express();
var PORT = process.env.PORT || 3000;

// routes locations
var authRoutes = require('./routes/oauth');
var mainRoutes = require('./routes/main');
var pollRoutes = require('./routes/poll');

// set up application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// connect to db
mongoose.connect('mongodb://localhost:27017/vote');
// mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/vote');

// setup view engine
app.set('views', './views');
app.set('view engine', 'pug');

// static files at
app.use(express.static(__dirname + '/temp/'));

require('./config/passport')(passport);

// required for passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// set up routes
app.use('/oauth', authRoutes);
app.use('/', mainRoutes);
app.use('/polls', pollRoutes);

// launch
app.listen(PORT, function () {
  return console.log('app is listening on port ' + PORT);
});