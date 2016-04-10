import { CDN_PATH, ASSETS_MANIFEST } from '../config';

function manifest(key) {
  const json = require(ASSETS_MANIFEST);
  const value = json[key];

  if (!value) {
    throw new Error(`Missing manifest key "${key}" in "${ASSETS_MANIFEST}".`);
  }

  return `${CDN_PATH}/${value}`;
}

export default Promise.resolve([
  manifest('vendor.js'),
  manifest('components.js'),
  manifest('app.js'),
]);
