var schema_utils = require("../utils/schema_utils");
var object_utils = require("../utils/object_utils");
var async = require('async');
var __ = require('i18n').__;

/**
 * Validates that the field values which are required are indeed given.
 */
var validate_required_fields = function(data, schema) {
  // Obtain the required fields from the schema.
  var required_fields = schema_utils.get_required_field_names(schema);

  // Iterate through the required fields and check if all of them are 
  // given in the data.
  for (var i = 0; i < required_fields.length; i++) {
    var required_field = required_fields[i];

    // Check, if the required field is given in data.
    var data_field = data[required_field];
    if (is_empty(data_field)) {
      return __("%s is required.", __(required_field));
    }
  }
};

/**
 * Validates that the field values which have to meet a minimal length, meet 
 * indeed this length.
 */
var validate_min_lengths = function(data, schema) {
  // Check if all fields meet the dictated minimal length.
  for (var field_name in data) {
    var min_length = schema_utils.get_field_min_length(schema, field_name);
    var field_value = data[field_name];

    // Check if the length of the field value is too short.
    if (field_value.length < min_length) {
      return __("%s must consist of at least %s characters.",
        __(field_name), min_length);
    } 
  }
};

/**
 * Validates that the field values which have to meet a maximal length, meet 
 * indeed this length.
 */
var validate_max_lengths = function(data, schema) {
  // Check if all fields meet the dictated maximal length.
  for (var field_name in data) {
    var max_length = schema_utils.get_field_max_length(schema, field_name);
    var field_value = data[field_name];

    // Check if the length of the field value is too long.
    if (field_value.length > max_length) {
      return __("%s must consist of at most %s characters.",
        __(field_name), max_length);
    } 
  }
};

/**
 * Validates that the field values which have to meet a specific syntax, meet 
 * indeed this syntax.
 */
var validate_syntaxes = function(data, schema) {
  // Check if all fields meet the dictated syntax.
  for (var field_name in data) {
    var syntax = schema_utils.get_field_syntax(schema, field_name);
    var field_value = data[field_name];

    // Check if the length of the field value is too long.
    if (syntax && !syntax.test(field_value)) {
      // TODO: Create more meaningful error message.
      return __("%s has invalid syntax.", __(field_name));
    } 
  }
};

/**
 * Returns the function to check if the given field value is unique for the
 * given model list. 
 */
var get_check_uniq_function = function(list, field_name, field_value) {
  return function(next) {
    var data = {};
    data[field_name] = field_value;

    list.model.findOne(data, function(err, item) {
      if (err || item) {
        next(__('%s is already registered.', __(field_name)));
      } else {
        next();
      } 
    });
  };
}

/**
 * Validates that the field values which have to be unique are indeed unique.
 */
var validate_unique_fields = function(data, list, next) {
  // Obtain the fields that have to be unique.
  var unique_fields = schema_utils.get_unique_field_names(list.schema);

  // For each unique field, create a function that check the uniqueness of the 
  // field value.
  var async_calls = [];
  for (var i = 0; i < unique_fields.length; i++) {
    var field_name = unique_fields[i];
    var field_value = data[field_name];

    if (field_value) {
      async_calls.push(get_check_uniq_function(list, field_name, field_value));
    }
  }

  if (async_calls.length > 0) {
    // Run each function in series.
    async.series(async_calls, function(err) {
      next(err);
    });
  } else {
    next();  
  }
};

// _____________________________________________________________________________
// Helper methods

var is_empty = function(value) {
  return (!value || value.trim().length == 0);
};

// _____________________________________________________________________________
// Public methods.

// Validates that the given data is compatible to the schema of the given model.
exports.compatible_to_model = function(data, model, next) {
  var flattened_data = object_utils.flatten(data);
  var schema = model.schema;

  var err = validate_required_fields(flattened_data, schema)
            || validate_min_lengths(flattened_data, schema)
            || validate_max_lengths(flattened_data, schema)
            || validate_syntaxes(flattened_data, schema);

  if (err) {
    next(err);
  } else {
    // Validate the uniqueness of fields (that must be done asynchronously).
    validate_unique_fields(flattened_data, model, next);
  }
};

// Validates that all fields in the given data are non-empty.
exports.fields_not_empty = function(data, next) {
  var flattened_data = object_utils.flatten(data);
  
  for (var key in flattened_data) {
    if (is_empty(flattened_data[key])){
      next(__('%s is empty.', __(key)));
      return;
    }
  }

  next();
};

