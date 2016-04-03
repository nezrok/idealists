var ks = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new ks.View(req, res);
		
	ks.session.signout(req, res, function() {
		res.redirect('/');
	});
};