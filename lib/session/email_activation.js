var keystone = require('keystone');
var crypto = require('crypto');

var separator = process.env.EMAIL_ACTIVATION_TOKEN_FIELD_SEPARATOR;
var algorithm = process.env.EMAIL_ACTIVATION_TOKEN_CRYPTO_ALGORITHM;
var secret    = process.env.EMAIL_ACTIVATION_TOKEN_SECRET;
var token_expiration_hours = process.env.EMAIL_ACTIVATION_TOKEN_EXPIRATION_PERIOD_IN_HOURS;

/**
 * Creates an email activation token for the given user.
 */
exports.create_email_activation_token = function(user) {
  var fields = [new Date(), user._id, user.email];
  var text = fields.join(separator);

  var cipher = crypto.createCipher(algorithm, secret);
  var token = cipher.update(text, 'utf8', 'hex');
  token += cipher.final('hex');

  return token;
}

/**
 * Verifies the given email activation token.
 */
exports.verify_email_activation_token = function(token) {
  var decipher = crypto.createDecipher(algorithm, secret);
  var text = decipher.update(token, 'hex', 'utf8');
  text += decipher.final('utf8');
  
  var fields = text.split(separator);

  if (fields.length != 3) {
  	// ERROR
  } else {
  	var now = new Date();

  	var token_date = new Date(fields[0]);
  	token_date.setHours(token_date.getHours() + token_expiration_hours);

  	if (token_date < now) {
  		// Expired.
  	}

  	var user_id = fields[1];
  	var email = fields[2];
  }

  return text.split(separator);
}