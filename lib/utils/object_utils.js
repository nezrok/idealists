var flatten_recursively = function(obj, stack, flattened) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      var new_stack = stack + (stack ? '.' : '') + property;
      if (typeof obj[property] == "object") {
        flatten_recursively(obj[property], new_stack, flattened);
      } else {
        flattened[new_stack] = obj[property];
      }
    }
  }
}

/**
 * Flattens the given object. 
 * For example, for an object {'foo': {'bar': 'baz' }} this method returns
 * {'foo.bar': 'baz' }
 */
exports.flatten = function(obj) {
  var flattened = {};
  flatten_recursively(obj, '', flattened);
  return flattened;
}