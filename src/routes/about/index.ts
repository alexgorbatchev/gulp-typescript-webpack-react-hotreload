export default {
  path: 'about',
  
  getChildRoutes(location, callback) {
    require.ensure([], () => callback(null, [
      require('./routes/contact').default,
      require('./routes/team').default,
    ]));
  },
  
  // childRoutes: [
  //   require('./contact').default,
  //   require('./team').default,
  // ],
  
  getComponents(location, callback) {
    require.ensure([], () => callback(null, require('./components/about').default));
  }
};