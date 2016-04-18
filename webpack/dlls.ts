import {
  ROOT_DIR,
  TEST_DLL,
  VENDOR_DLL,
  DEV_DLL,
} from '../config';

interface IPlugin {
  new (opts: Object): Function;
}

const DllReferencePlugin: IPlugin = require('webpack').DllReferencePlugin;
const DllPlugin: IPlugin = require('webpack').DllPlugin;

export class TestDllReferencePlugin extends DllReferencePlugin {
  constructor() {
    super({
      context: ROOT_DIR,
      manifest: require(TEST_DLL),
      sourceType: 'var',
    });
  }
}

export class TestDllPlugin extends DllPlugin {
  constructor() {
    super({
      path: TEST_DLL,
      name: 'test',
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

export class VendorDllPlugin extends DllPlugin {
  constructor() {
    super({
      path: VENDOR_DLL,
      name: 'vendor',
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

export class DevDllPlugin extends DllPlugin {
  constructor() {
    super({
      path: DEV_DLL,
      name: 'dev',
    });
  }
}
