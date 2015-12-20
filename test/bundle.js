//
// This is a proxy for karma tests that helps with the sourcemaps.
//
var appContext = require.context(__dirname, true, /\.test\.ts(x)?$/);
appContext.keys().forEach(appContext);
