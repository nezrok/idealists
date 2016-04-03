/**
 * Returns the required fields of the given schema in a list.
 */
exports.get_required_field_names = function(schema) {
  var required_fields = [];
  for (var path in schema.paths) {
    if (schema.paths[path].options.required) {
      required_fields.push(path);
    }
  }
  return required_fields;
};

/**
 * Returns the fields of the given schema whose values must be unique.
 */
exports.get_unique_field_names = function(schema) {
  var unique_fields = [];
  for (var path in schema.paths) {
    if (schema.paths[path].options.unique) {
      unique_fields.push(path);
    }
  }
  return unique_fields;
};

/**
 * Returns all fields of the given schema in a list.
 */
exports.get_field_names = function(schema) {
  var required_fields = [];
  for (var path in schema.paths) {
    required_fields.push(path);
  }
  return required_fields;
};

/**
 * Returns the min_length for the given field that is defined in the given 
 * schema. Returns positive infinity if the field is not defined by the given 
 * schema or no min_length is not defined for the field.
 */
exports.get_field_min_length = function(schema, field_name) {
  var field = schema.paths[field_name];

  if (field) {
    var min_length = field.options.min_length;
    if (min_length) {
      return min_length;
    }
  }
  return -Infinity;
}

/**
 * Returns the max_length for the given field that is defined in the given 
 * schema. Returns negative infinity if the field is not defined by the given 
 * schema or no max_length is not defined for the field.
 */
exports.get_field_max_length = function(schema, field_name) {
  var field = schema.paths[field_name];

  if (field) {
    var max_length = field.options.max_length;
    if (max_length) {
      return max_length;
    }
  }
  return Infinity;
}

/**
 * Returns the pattern that describes the valid syntax for the given field.
 * Returns undefined if the field is not defined by the given schema or no 
 * syntax pattern is defined for the field.
 */
exports.get_field_syntax = function(schema, field_name) {
  var field = schema.paths[field_name];

  return field ? field.options.syntax : undefined;
}