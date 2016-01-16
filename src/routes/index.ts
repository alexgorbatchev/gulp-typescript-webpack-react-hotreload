export default {
  path: '/',

  // getChildRoutes(location, callback) {
  //   require.ensure([], () => callback(null, [
  //     require('./blog').default,
  //     require('./about').default,
  //   ]));
  // },
  childRoutes: [
    require('./blog').default,
    require('./about').default,
  ],

  getComponents(location, callback) {
    require.ensure([], () => callback(null, require('../containers/application').default));
  },
};