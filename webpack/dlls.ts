const {
  DllReferencePlugin,
  DefinePlugin,
} = require('webpack');

import {
  ROOT_DIR,
  TEST_DLL,
  VENDOR_DLL,
  DEV_DLL,
} from '../config';

export const testDll = () => new DllReferencePlugin({
  context: ROOT_DIR,
  manifest: require(TEST_DLL),
  sourceType: 'var',
});

export const vendorDll = () => new DllReferencePlugin({
  context: ROOT_DIR,
  manifest: require(VENDOR_DLL),
  sourceType: 'var',
});

export const devDll = () => new DllReferencePlugin({
  context: ROOT_DIR,
  manifest: require(DEV_DLL),
  sourceType: 'var',
});
