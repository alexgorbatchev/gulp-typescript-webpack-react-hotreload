export default {
  path: 'contact',

  getComponents(location, callback) {
    require.ensure([], () => callback(null, require('../containers/contact').default));
  }
};
