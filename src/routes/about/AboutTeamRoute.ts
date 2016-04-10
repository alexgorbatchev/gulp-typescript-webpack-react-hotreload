export default {
  path: 'team',

  getComponents(location, callback) {
    require.ensure(
      [],
      () => callback(null, require('./containers/TeamContainer').default),
      'about-team'
    );
  }
};
