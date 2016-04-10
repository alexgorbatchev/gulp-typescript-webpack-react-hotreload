export default {
  path: 'about',

  childRoutes: [
    require('./AboutContactRoute').default,
    require('./AboutTeamRoute').default,
  ],

  getComponents(location, callback) {
    require.ensure(
      [],
      () => callback(null, require('./containers/AboutContainer').default),
      'about'
    );
  }
};
