var ks = require('keystone');
var async = require('async');
var User = ks.list('User');
var validate = require('../../../lib/validate/validate');
var email = require('../../../lib/email/email');
var email_activation = require('../../../lib/session/email_activation');
var __ = require('i18n').__;

exports = module.exports = function(req, res) {
  // Redirect if the user is already logged in.
  if (req.user) {
    return res.redirect('/me');
  }

  // var mail = new email.Email("confirm-email");
  //       mail.send({
  //        "from": "cldskrzn@gmail.com",
  //        "to": "seakey@gmx.net",
  //        "subject": "seakey@gmx.net",
  //        "url": "pups"
  //      }, function(err) {
  //         console.log(err);
  //      });

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
      new User.model(data).save(function(err, user) {
        next(err, user);
      });
    };  
  };

  // Returns the function that handles the result from executed action.
  var get_handle_join_result_function = function(next) {
    return function(err, result) {
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
        
        var validation_result = result[0];
        var user = result[1];

        var token = email_activation.create_email_activation_token(user);
        var text = email_activation.verify_email_activation_token(token);
        
        console.log(token);
        console.log(text);
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
      get_handle_join_result_function(next)
    );
  });

  // Render the view.
  view.render('session/join');
}