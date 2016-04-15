import configBase from './config-base';
import { DevDllPlugin, VendorDllReferencePlugin } from './dlls';

interface IEntries {
  dev?: Array<string>;
}

const config = configBase<IEntries>();
export default config;

config.entry.dev = [
  'redux-devtools',
  'redux-devtools-log-monitor',
  'redux-devtools-dock-monitor',
  'react-hot-api',
  'react-hot-loader',
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
];

config.output.library = 'dev';
config.output.libraryTarget = 'var';

config.plugins.push(
  new VendorDllReferencePlugin(),
  new DevDllPlugin()
);
