/**
 * This loader solves a problem of babel-loader expecting a source map to be
 * and object and for some reason it is a string. It sits in front of babel
 * and parses `inputMap` JSON string into an object.
 */
module.exports = function (input, inputMap) {
  const callback = this.async();
  let err = null;

  if (this.cacheable) {
    this.cacheable();
  }

  if (typeof (inputMap) === 'string') {
    inputMap = JSON.parse(inputMap);
  } else {
    err = new Error('Seems that the `source-map-fix` loader got a JSON instead of a string, maybe it is not needed any more?');
  }

  callback(err, input, inputMap);
};
