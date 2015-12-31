export default {
  path: 'blog',
  
  getComponents(location, callback) {
    require.ensure([], () => callback(null, require('./components/blog').default));
  }
};