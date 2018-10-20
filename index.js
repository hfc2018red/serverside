const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const port = process.env.PORT || 3000;

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
const app = express();
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({ secret: 'test' }));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

const User = require('./models/User');

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
  res.send('home');
});

require('./routes')(app);
require('./auth')(app);

db.on('error', () => {
  console.error(`Cannot connect to db ${process.env.MONGODB_URI}`);
});

db.on('open', () => {
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});
