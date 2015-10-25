//
// This is a proxy for karma tests that helps with the sourcemaps.
//
var appContext = require.context('.', true, /\.test\.ts$/);
appContext.keys().forEach(appContext);
