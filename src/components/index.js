var appContext = require.context(__dirname, true, /index\.tsx$/);
appContext.keys().forEach(appContext);
