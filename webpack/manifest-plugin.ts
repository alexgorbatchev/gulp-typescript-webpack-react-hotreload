import * as path from 'path';

import {
  BUILD_PUBLIC_DIR,
  ASSETS_MANIFEST,
} from '../config';

interface IManifestPlugin {
  new (opts: Object): Function
}

const ManifestPlugin: IManifestPlugin = require('webpack-manifest-plugin');

// This is a cache object for the generated manifest so that all manifests
// end up in the same file.
const cache = {};

export default class extends ManifestPlugin {
  constructor() {
    super({
      fileName: path.relative(BUILD_PUBLIC_DIR, ASSETS_MANIFEST),
      cache,
    });
  }
}
