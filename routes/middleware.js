/**
 * This file contains the common middleware used by the routes.
 * 
 * The structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

// _____________________________________________________________________________

// Import some dependencies. 

var _ = require('underscore');

// _____________________________________________________________________________

// Define the middleware functions.
// Keystone expects middleware functions to accept the following arguments:
//     req  - the express request object.
//     res  - the express response object.
//     next - the method to call when the middleware has finished running 
//            (including any internal callbacks).

// Define a middleware function that initializes the local variables for views 
// and include anything that should be initialized before route controllers are 
// executed.
exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Home',		key: 'home',		href: '/' },
		{ label: 'Blog',		key: 'blog',		href: '/blog' }
	];
	
	locals.user = req.user;
	
	next();
	
};

// Define a middleware function that fetches and clears the flashMessages 
// before a view is rendered.
exports.flashMessages = function(req, res, next) {
	
	// Keystone includes support for 'flashing' messages to the users via 
	// session (to survive redirects). 
	// The default setup supports four categories: info, success, warning, error
	// To use flash messages in the route controllers, do this:
	// req.flash('info', 'Some information!');
	// Some Keystone features (such as the Update Handler) can automatically 
	// generate flash messages and expect the categories above to be available.
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


// Define a middleware function that prevents people from accessing protected 
// pages when they're not signed in
exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};
