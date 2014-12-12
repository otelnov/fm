var path = require('path');
//var mkdirp = require('mkdirp');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app) {
  'use strict';
  var config = app.get('config');
  var router = app.get('router');

  var mongoose = require('mongoose');
  var Users = mongoose.model('Users');

  router.get('/me', function(req, res) {
    if(!req.user){
      return res.json({ error: true });
    }
    res.json({ error: null, user: req.user });
  });

  router.get('/auth/google',
      passport.authenticate('google', { scope: config.social.GOOGLE_SCOPE })
  );

  router.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/error', successRedirect: '/' })
  );

  router.get('/auth/facebook',
      passport.authenticate('facebook', { scope: config.social.FACEBOOK_SCOPE })
  );

  router.get('/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/error', successRedirect: '/' })
  );

  router.put('/users/:id', function(req, res) {
    var id = req.params.id;
    var user = req.body;
    user.updatedAt = Date.now();
    delete user._id;
    Users.findOneAndUpdate({_id: id}, user, function (err, data) {
      res.json({ success: !err, data: data, error: err });
    });
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  /*
   * PASSPORT
   */
  function findUserById(id, cb) {
    Users.findOne({
      _id: id
    }, function (err, user) {
      cb(err, user);
    });
  }
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    findUserById(id, function (err, user) {
      done(err, user);
    });
  });

  // GOOGLE STRATEGY
  passport.use(new GoogleStrategy({
    clientID: config.social.GOOGLE_CLIENT_ID,
    clientSecret: config.social.GOOGLE_CLIENT_SECRET,
    callbackURL: config.social.GOOGLE_CALLBACK_URL
  }, function (accessToken, refreshToken, profile, done) {
    Users.findOne({
      $or: [
        {'providerId': profile._json.id},
        {'email': profile._json.email}
      ]
    }, function (err, user) {
      // user not found -> create new
      if (!user) {
        user = new Users({
          name: profile._json.given_name,
          surname: profile._json.family_name,
          displayName: profile._json.name,
          email: profile._json.email,
          image: profile._json.picture,
          provider: 'google',
          providerId: profile._json.id
        });
        user.save();
        return done(err, user);
      } else {
        return done(err, user);
      }
    });
  }));

  // FACEBOOK STRATEGY
  passport.use(new FacebookStrategy({
    clientID: config.social.FACEBOOK_APP_ID,
    clientSecret: config.social.FACEBOOK_APP_SECRET,
    callbackURL: config.social.FACEBOOK_CALLBACK_URL,
    profileURL: 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,picture,email'
  }, function (accessToken, refreshToken, profile, done) {
    Users.findOne({
      $or: [
        {'providerId': profile._json.id},
        {'email': profile._json.email}
      ]
    }, function (err, user) {
      // user not found -> create new
      if (!user) {
        user = new Users({
          name: profile._json.first_name,
          surname: profile._json.last_name,
          displayName: profile._json.name,
          email: profile._json.email,
          image: profile._json.picture.data.url,
          provider: profile.provider,
          providerId: profile._json.id
        });
        user.save();
        return done(err, user);
      } else {
        return done(err, user);
      }
    });
  }));

};