var keystone = require('keystone');
var crypto = require('crypto');

var separator = process.env.EMAIL_ACTIVATION_TOKEN_FIELD_SEPARATOR;
var algorithm = process.env.EMAIL_ACTIVATION_TOKEN_CRYPTO_ALGORITHM;
var secret    = process.env.EMAIL_ACTIVATION_TOKEN_SECRET;

/**
 * Creates an email activation link for the given user.
 */
exports.create_email_activation_token = function(user) {
  var fields = [new Date(), user._id, user.email]
  var text = fields.join(separator);

  var cipher = crypto.createCipher(algorithm, secret);
  var token = cipher.update(text, 'utf8', 'hex');
  token += cipher.final('hex');

  return token;
}

/**
 * Creates an email activation link for the given user.
 */
exports.verify_email_activation_token = function(token) {
  var decipher = crypto.createDecipher(algorithm, secret)
  var text = decipher.update(token, 'hex', 'utf8')
  text += decipher.final('utf8');
  
  return text.split(separator);
}