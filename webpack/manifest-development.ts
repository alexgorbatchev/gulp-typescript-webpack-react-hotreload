// This is a file manifest that is used by gulp task to build index.html
// in the public build folder.

export default Promise.resolve([
  '/static/vendor.js',
  '/static/dev.js',
  '/webpack/components.js',
  '/webpack/app.js',
  '/webpack/root.js',
]);
