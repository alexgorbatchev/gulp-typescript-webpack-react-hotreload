// entry point for building webpack dll
var context = require.context(__dirname, true, /^[\w\.\/]+\.js$/);
context.keys().map(context);
