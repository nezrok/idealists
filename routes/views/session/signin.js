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
  
  // Returns the function that validates the given data against the schema of 
  // the given list.
  var get_validate_function = function(data) {
    return function(next) {
      validate.fields_not_empty(data, next);
    };
  };

  // Returns the function that signs in the user.
  var get_signin_function = function(data) {
    return function(next) {
      var on_success = function() {
        next();
      }
      
      var on_error = function(err) {
        next(__('%s or %s is incorrect.', __("screen_name"), __("password")));
      }
      
      ks.session.signin(data, req, res, on_success, on_error);
    };  
  };

  // Returns the function that handles the result from executed action.
  var get_handle_signin_result_function = function(data, next) {
    return function(err) {
      // Check, if there is an error occurred on action.
      if (err) {
        req.flash("error", err);
        next();
      } else {
        res.redirect('/me');
      }
    };  
  };

  // ___________________________________________________________________________

  view.on('post', { action: 'signin' }, function(next) {
    // Compose the data from signin form.
    var sign_in_data = { 
      email: req.body.email, 
      password: req.body.password
    };

    async.series([
      // Validate the input.
      get_validate_function(sign_in_data),
      // Sign in.
      get_signin_function(sign_in_data)
    ], 
      // Handle the result.
      get_handle_signin_result_function(sign_in_data, next)
    );    
  });
  
  // Render the view.
  view.render('session/signin');
}