var passport = require('passport');
var User = require('./models/User');

module.exports = function (app) {
  /*
  app.get('/', function (req, res) {
    res.render('index', { user: req.user });
  });
  */

  /*
  app.get('/register', function (req, res) {
    res.render('register', { });
  });
  */

  app.post('/register', function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, account) {
      if (err) {
        // @TODO
        return res.render('register', { account: account });
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    });
  });

  /*
  app.get('/login', function (req, res) {
    res.render('login', { user: req.user });
  });
  */

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};
