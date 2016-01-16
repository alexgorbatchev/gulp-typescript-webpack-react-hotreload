export default {
  path: 'team',

  getComponents(location, callback) {
    require.ensure([], () => callback(null, require('../containers/team').default));
  }
};