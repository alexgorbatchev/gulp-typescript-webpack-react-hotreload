export default {
  path: 'about',
  getComponent(location, callback) {
    require.ensure([], require => callback(null, require('./about')['default']));
  }
};