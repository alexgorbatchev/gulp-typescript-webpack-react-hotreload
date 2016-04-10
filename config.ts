import * as path from 'path';

export const ENV: string = process.env.NODE_ENV || 'development';
export const PRODUCTION: boolean = ENV === 'production';
export const TEST: boolean = ENV === 'test';
export const STAGING: boolean = ENV === 'staging';
export const DEVELOPMENT: boolean = !PRODUCTION && !TEST;

export const ROOT_DIR: string = __dirname;
export const SRC_DIR: string = path.join(ROOT_DIR, 'src');
export const BUILD_DIR: string = path.join(ROOT_DIR, 'build');
export const BUILD_PUBLIC_DIR: string = path.join(BUILD_DIR, 'public');
export const BUILD_SRC_DIR: string = path.join(BUILD_DIR, 'src');

export const VENDOR_DLL: string = path.join(BUILD_PUBLIC_DIR, 'vendor-dll.json');
export const DEV_DLL: string = path.join(BUILD_PUBLIC_DIR, 'dev-dll.json');
export const TEST_DLL: string = path.join(BUILD_PUBLIC_DIR, 'test-dll.json');

export const ASSETS_MANIFEST: string = path.join(BUILD_PUBLIC_DIR, 'webpack-manifest.json');

export const CDN_PATH: string = getCDNPath();
export const WEBPACK_PUBLIC_PATH: string = (CDN_PATH || '/webpack') + '/';

function getCDNPath(): string {
  const values = {
    production: '/static',
    staging: '/static'
  };

  return values[ENV];
}
