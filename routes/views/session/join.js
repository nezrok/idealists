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
      validate.compatible_to_model(data, User, next);
    };
  };

  // Returns the function that joins the user.
  var get_join_function = function(data) {
    return function(next) {
      new User.model(data).save(next);
    };  
  };

  // Returns the function that handles the result from executed action.
  var get_handle_join_result_function = function(data, next) {
    return function(err) {
      // Check, if there is an error occurred on action.
      if (err) {
        req.flash("error", err);
        next();
      } else {
        var on_success = function() {
          res.redirect('/me');
        }
        
        var on_error = function(err) {
          req.flash('error', __('Signing in failed, please try again.'));
          next();
        }
        
        // Joined successfully. Sign in the user.
        ks.session.signin(data, req, res, on_success, on_error);  
      }
    };  
  };

  // ___________________________________________________________________________

  view.on('post', { action: 'join' }, function(next) {
    // Compose the user data from join form.
    var user_data = {
      name: {
        'first': req.body.first_name, 
        'last': req.body.last_name
      },
      screen_name: req.body.screen_name,
      email: req.body.email,
      password: req.body.password
    }

    async.series([
      // Validate the input.
      get_validate_function(user_data),
      // Join.
      get_join_function(user_data)
    ], 
      // Handle the result.
      get_handle_join_result_function(user_data, next)
    );
  });

  // Render the view.
  view.render('session/join');
}