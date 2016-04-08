/**
 * Updates provide an easy way to seed the database, transition data when the 
 * models change, or run transformation scripts against the database.
 *
 * Update files should be named using a semantic version followed by an optional 
 * key, like 0.0.1-init.js. The version numbers are used to order the update 
 * scripts correctly, while the keys are a nice way to identify what each update
 * does.
 *
 * Each update file should export a single function, which should accept a 
 * single argument - the next(err) callback, to be called when the update is 
 * complete.
 *
 * All the update files will be executed (each one waits for the previous update
 * to complete) before the web server is started.
 *
 * If the next callback is receives an error it will be reported to the console,
 * and application initialisation will halt.
 *
 *
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time.
 */

// _____________________________________________________________________________

// Define some dependencies.

var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

// _____________________________________________________________________________

// Define the admins.

var admins = [
	{ 
		name: { first: 'Claudius', last: 'Korzen'}, 
		screen_name: 'admin', 
		email: 'admin@idealists.de', 
		password: 'admin' 
	}
];

function createAdmin(admin, done) {
	var newAdmin = new User.model(admin);
	
	newAdmin.is_admin = true;
	newAdmin.save(function(err) {
		if (err) {
			console.error("Error adding admin " + admin.email + " to the database:");
			console.error(err);
		} else {
			console.log("Added admin " + admin.email + " to the database.");
		}
		done(err);
	});
}

// Create the admins.
exports = module.exports = function(done) {
	async.forEach(admins, createAdmin, done);
};