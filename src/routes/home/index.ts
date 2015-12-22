export default {
  path: '/home',
  getComponent(location, callback) {
    require.ensure([], require => callback(null, require('./home')['default']));
  }
};