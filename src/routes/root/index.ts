export default {
  path: '/',

  // getChildRoutes(location, callback) {
  //   require.ensure([], () => callback(null, [
  //     require('./blog').default,
  //     require('./about').default,
  //   ]));
  // },
  childRoutes: [
    require('../blog/BlogRoute').default,
    require('../about/AboutRoute').default,
  ],

  getComponents(location, callback) {
    require.ensure(
      [],
      () => callback(null, require('./containers/ApplicationContainer').default),
      'root'
    );
  },
};
