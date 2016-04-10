import {
  ROOT_DIR,
  TEST_DLL,
  VENDOR_DLL,
  DEV_DLL,
} from '../config';

interface IDllReferencePlugin {
  new (opts: Object): Function;
}

const DllReferencePlugin: IDllReferencePlugin = require('webpack').DllReferencePlugin;

export class TestDllReferencePlugin extends DllReferencePlugin {
  constructor() {
    super({
      context: ROOT_DIR,
      manifest: require(TEST_DLL),
      sourceType: 'var',
    });
  }
}

export class VendorDllReferencePlugin extends DllReferencePlugin {
  constructor() {
    super({
      context: ROOT_DIR,
      manifest: require(VENDOR_DLL),
      sourceType: 'var',
    });
  }
}

export class DevDllReferencePlugin extends DllReferencePlugin {
  constructor() {
    super({
      context: ROOT_DIR,
      manifest: require(DEV_DLL),
      sourceType: 'var',
    });
  }
}
