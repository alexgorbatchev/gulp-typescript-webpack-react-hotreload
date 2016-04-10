export default {
  path: 'blog',

  getComponents(location, callback) {
    require.ensure(
      [],
      () => callback(null, require('./containers/BlogContainer').default),
      'blog'
    );
  }
};
