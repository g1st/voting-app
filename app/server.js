// import express from 'express'; <= can go back to this after project is finished
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// setup view engine
app.set('views', './views');
app.set('view engine', 'pug');

// static files at
app.use(express.static(`${__dirname}/temp/`));

app.get('/', (req, res) => {
  res.render('index', { title: 'Voting App', message: 'Voting App' });
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
