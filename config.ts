import * as path from 'path';

export const PRODUCTION: boolean = process.env.NODE_ENV === 'production';
export const TEST: boolean = process.env.NODE_ENV === 'test';
export const DEVELOPMENT: boolean = !PRODUCTION && !TEST;
export const ROOT_DIR: string = __dirname;
export const SRC_DIR: string = path.join(ROOT_DIR, 'src');
export const BUILD_DIR: string = path.join(ROOT_DIR, 'build');
export const BUILD_PUBLIC_DIR: string = path.join(BUILD_DIR, 'public');
export const BUILD_SRC_DIR: string = path.join(BUILD_DIR, 'src');
export const PUBLIC_PATH: string = '/webpack/';
export const VENDOR_DLL: string = path.join(BUILD_PUBLIC_DIR, 'vendor-dll.json');
export const DEV_DLL: string = path.join(BUILD_PUBLIC_DIR, 'dev-dll.json');
export const TEST_DLL: string = path.join(BUILD_PUBLIC_DIR, 'test-dll.json');
export const VENDOR_MANIFEST: string = path.join(BUILD_PUBLIC_DIR, 'vendor-manifest.json');
export const APP_MANIFEST: string = path.join(BUILD_PUBLIC_DIR, 'app-manifest.json');
export const DEV_MANIFEST: string = path.join(BUILD_PUBLIC_DIR, 'dev-manifest.json');

export const CDN_PATH: string = PRODUCTION ? '//cdn/production' : '//cdn/staging';
