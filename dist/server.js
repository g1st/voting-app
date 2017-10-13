'use strict';

// import express from 'express'; <= can go back to this after project is finished
var express = require('express');

var app = express();

var PORT = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Voting App', message: 'Voting App' });
});

app.listen(PORT, function () {
  return console.log('app is listening on port ' + PORT);
});