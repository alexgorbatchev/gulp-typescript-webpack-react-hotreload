export default {
  path: 'about',

  childRoutes: [
    require('./about-contact').default,
    require('./about-team').default,
  ],

  getComponents(location, callback) {
    require.ensure([], () => callback(null, require('../containers/about').default));
  }
};
