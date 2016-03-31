/**
 * This file defines the routes and controllers.
 * 
 * Here we bind the application's URL patterns to the controllers that load
 * and process data and render the appropriate template.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

// _____________________________________________________________________________

// Import some dependencies. 

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// _____________________________________________________________________________

// Include the middleware we want to run for every request. Middlewares can be
// attached to the pre('routes') and pre('render') events. 

// Bind middleware that ...

// ... initializes common local variables for the view templates.
keystone.pre('routes', middleware.initLocals);
// ... retrieves flash messages from session before view template is rendered. 
keystone.pre('render', middleware.flashMessages);

// _____________________________________________________________________________

// Use the importer to load all route controllers in /routes/views/

var routes = {
	views: importRoutes('./views')
};

// _____________________________________________________________________________

// Bind route controllers to given URL patterns. 
// Each route controller is responsible for all the processing that needs to 
// happen for the route (e.g. loading data, handling form submissions, 
// rendering the view template).
// A route controller can be bound to GET, POST or both requests using 
// 'app.get', 'app.post' or 'app.all'.

exports = module.exports = function(app) {
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	
	
	// NOTE: To protect a route so that only admins can see it, use the 
	// requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
};
