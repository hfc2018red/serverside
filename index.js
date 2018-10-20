const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.set('origins', '*:*');

const auth = (req, res, next) => {
  console.log(req.path);
  if (!req.user && req.path === '/') {
    res.redirect('login.html');
  }

  next();
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

require('./routes')(app, io, auth);
require('./auth')(app, auth);

app.use(auth);
// app.use(express.static('serverpublic'));
// app.use(express.static('build'));

db.on('error', () => {
  console.error(`Cannot connect to db ${process.env.MONGODB_URI}`);
});

db.on('open', () => {
  server.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});
