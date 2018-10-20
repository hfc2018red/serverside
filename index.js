const mongoose = require('mongoose');
const express = require('express');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const passportLocalMongoose = require('passport-local-mongoose');

const port = process.env.PORT || 3000;

const app = express();
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

// const User = new Schema({});
// User.plugin(passportLocalMongoose);

app.get('/', (req, res) => {
  res.send('home');
});

require('./routes')(app);

db.on('error', () => {
  console.error(`Cannot connect to db ${process.env.MONGODB_URI}`);
});

db.on('open', () => {
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});
