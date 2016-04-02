// entry point for building webpack dll
var appContext = require.context(__dirname, true, /(?!test)\.ts(x)?$/);
appContext.keys().forEach(appContext);
