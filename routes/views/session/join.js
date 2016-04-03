var ks = require('keystone');
var async = require('async');
var User = ks.list('User');
var validate = require('../../../lib/validate/validate');
var __ = require('i18n').__;

exports = module.exports = function(req, res) {
  // Redirect if the user is already logged in.
  if (req.user) {
    return res.redirect('/me');
  }

  var view = new ks.View(req, res);
  var locals = res.locals;

  // Pass through the form data such that are still available in case of 
  // validation errors.
  locals.form = req.body;

  // Saves the user.
  var saveUser = function(userData, callback) {   
    new User.model(userData).save(callback);
  };

  view.on('post', { action: 'join' }, function(next) {
    var userData = {
      name: {
        'first': req.body.first_name, 
        'last': req.body.last_name
      },
      screen_name: req.body.screen_name,
      email: req.body.email,
      password: req.body.password
    }

    async.series([
      function(next) { 
        validate.validate(userData, User, next); 
      }, 
      function(next) { 
        saveUser(userData, next); 
      }
    ], function(err) {
      if (err) {
        req.flash("error", err);
        return next();
      }
      var onSuccess = function() {
        res.redirect('/me');
      }
        
      var onError = function(err) {
        req.flash('error', 'Signing in failed, please try again.');
        return next();
      }
        
      ks.session.signin({ 
        email: req.body.email, 
        password: req.body.password 
      }, req, res, onSuccess, onError);
    });
  });

  view.render('session/join');
}