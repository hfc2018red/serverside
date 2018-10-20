const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const proxyOptions = {
  target: 'https://hfcresponder.netlify.com',
  ws: true,
  changeOrigin: true,
  pathRewrite: {
    '^/admin': '/'
  }
};

const port = process.env.PORT || 3000;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.set('origins', '*:*');

app.use(cors());
app.use('/admin', proxy(proxyOptions));
app.use('/static', proxy(proxyOptions));
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

require('./routes')(app, io);
require('./auth')(app);

db.on('error', () => {
  console.error(`Cannot connect to db ${process.env.MONGODB_URI}`);
});

db.on('open', () => {
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});
