import { Promise } from 'es6-promise';

export default new Promise(resolve =>
  require.ensure([], require => resolve(require('./header')))
);
