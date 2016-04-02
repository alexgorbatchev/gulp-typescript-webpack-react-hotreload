// entry point for building webpack dll
var appContext = require.context(__dirname, true, /^[\w\.\/]+\.ts(x)?$/);
