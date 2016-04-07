/**
 * This is the main script that setups and starts the application.
 */

// _____________________________________________________________________________

// Define some dependencies.

// Load the ".env" file.
require('dotenv').load();

var keystone = require('keystone');
var i18n = require('i18n');

// _____________________________________________________________________________

// The configuration of the application.
// See http://keystonejs.com/docs/configuration/ for full documentation of 
// available options.

keystone.init({
	// ***** Define the basic options. *****

	// Define the name of the application.
	'name': 'idealists',
	
	// Define the brand of the application (is displayed the top left hand 
	// corner of the Admin UI).
	'brand': 'idealists',
	
	// Define your cookie secret here (or as environment variable) 
	'cookie secret': '(define your secret here)',

	// ***** Define the web server options. *****

	// Define the path to the view templates.
	'views': 'templates/views',

	// Define the template engine to use by default.
	'view engine': 'jade',

	// Define the path to the static files.
	'static': 'public',

	// Define the path to sass files. When this option is set, any requests to 
	// a .css file will first check for a .sass file with the same name, and if 
	// one found, the css file will be generated.
	'sass': 'public',
	
	// Define the path to the favicon.
	'favicon': 'public/favicon.ico',

	// ***** Define the database options. *****
	
	// Define the support of session management.
	'session': true,
	
	// Define the use of the built-in views for signing in and out. 
	'auth': true,

	// Define the model to use for authentication and session management.
	'user model': 'User',

	// ***** Define the update options. ******

	// Define the support of auto updates.
	'auto update': true,
});

// _____________________________________________________________________________

// Load the models.

keystone.import('models');

// _____________________________________________________________________________

// Setup common locals for the templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set 
// uniquely for each request) should be added to ./routes/middleware.js.

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// _____________________________________________________________________________

// Configure i18n

i18n.configure({
	locales:['en', 'de'],
	directory: __dirname + '/locales'
});

// _____________________________________________________________________________

// Load the routes.

keystone.set('routes', require('./routes'));

// _____________________________________________________________________________

// Configure the navigation bar in Keystone's Admin UI.

keystone.set('nav', {
	'users': 'users'
});

// _____________________________________________________________________________

// Start the app to connect to the database and initialise the web server.

keystone.start();
