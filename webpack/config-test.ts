import configBase from './config-base';
import { TestDllPlugin, VendorDllReferencePlugin, DevDllReferencePlugin } from './dlls';

interface IEntries {
  test?: Array<string>;
}

const config = configBase<IEntries>();
export default config;

config.entry.test = [
  'chai',
  'sinon/pkg/sinon.js',
  'sinon-chai',
  'react-addons-test-utils',
];

config.output.library = 'test';
config.output.libraryTarget = 'var';

config.plugins.push(
  new VendorDllReferencePlugin(),
  new DevDllReferencePlugin(),
  new TestDllPlugin()
);
