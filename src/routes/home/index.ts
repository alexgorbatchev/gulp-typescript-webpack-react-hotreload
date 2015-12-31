export default {
  path: 'home',
  
  getComponents(location, callback) {
    require.ensure([], () => callback(null, require('./components/home').default));
  }
};