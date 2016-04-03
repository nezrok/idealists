var ks = require('keystone');
var	async = require('async');

exports = module.exports = function(req, res) {
	// Redirect if the user is already logged in.
	if (req.user) {
		return res.redirect('/me');
	}
	
	var view = new ks.View(req, res);
	var	locals = res.locals;
	
	// Pass through the form data such that are still available in case of 
	// validation errors.
	locals.form = req.body;
	
	view.on('post', { action: 'signin' }, function(next) {
		var screen_name = req.body.screen_name;
		var password = req.body.password;

		if (!screen_name) {
			req.flash('error', 'Please enter your screen name.');
			return next();
		}
		
		if (!password) {
			req.flash('error', 'Please enter your password.');
			return next();
		}

		var onSuccess = function() {
			res.redirect('/me');
		}
		
		var onError = function() {
			req.flash('error', 'Your screen name and/or password were incorrect, please try again.');
			return next();
		}
		
		ks.session.signin({ 
			screen_name: screen_name, 
			password: password 
		}, req, res, onSuccess, onError);
	});
	
	view.render('session/signin');
}