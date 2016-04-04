var ks = require('keystone');

exports = module.exports = function(req, res) {		
	ks.session.signout(req, res, function() {
		res.redirect('/');
	});
};