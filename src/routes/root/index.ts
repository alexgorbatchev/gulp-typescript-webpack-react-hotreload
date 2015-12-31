export default {
  path: '/',
  
  getChildRoutes(location, callback) {
    require.ensure([], () => callback(null, [
      require('./routes/blog').default,
      require('./routes/about').default,
    ]));
  },
  
  getComponents(location, callback) {
    require.ensure([], () => callback(null, require('./components/application').default));
  },
};