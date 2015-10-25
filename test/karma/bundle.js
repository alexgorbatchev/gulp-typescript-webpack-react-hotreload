var appContext = require.context('.', true, /\.test\.ts$/);
appContext.keys().forEach(appContext);
