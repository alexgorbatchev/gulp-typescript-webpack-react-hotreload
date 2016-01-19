//
// This is a proxy for karma tests that helps with the sourcemaps.
//
var appContext = require.context(__dirname + '/../src', true, /test\.ts(x)?$/);
appContext.keys().forEach(appContext);

var chai = require('chai');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
