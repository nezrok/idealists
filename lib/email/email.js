var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var emailTemplates = require('email-templates');
var templatesDir = path.resolve(__dirname, 'templates');

/**
 * Email Class
 * ===========
 */
exports.Email = function(options) {
  if (!options) {
    options = {};
  } else if (typeof options === 'string') {
    options = {
      template_name: options
    };
  }

  this.template_name = options.template_name;

  this.transporter = nodemailer.createTransport(smtpTransport({
    service: options.service || process.env.EMAIL_SMTP_SERVICE,
    auth: {
      user: options.user || process.env.EMAIL_SMTP_AUTH_USER,
      pass: options.pass || process.env.EMAIL_SMTP_AUTH_PASS,
    }
  }));

  return this;
};

/**
 * Sends the email
 */ 
exports.Email.prototype.send = function(options, callback) {
  if (this.template_name) {
    this.send_template(options, callback);
  } else {
    this.send_mail(options, callback)
  }
};

/**
 * Renders the template and sends the email.
 */ 
exports.Email.prototype.send_template = function(options, callback) {
  var self = this;
  emailTemplates(templatesDir, function(err, template) {
    if (err) {
      callback(error);
    } else {
      // Send a single email
      template(self.template_name, options, function(error, html, text) {
        if (error) {
          callback(error);
        } else {
          options.html = html;
          options.text = text;
          self.send_mail(options, callback);
        }
      });
    }
  });
};

/**
 * Sends the email
 */ 
exports.Email.prototype.send_mail = function(options, callback) {
  this.transporter.sendMail(options, callback);
};