/**
 * This is the configuration file.
 *
 * This file is used by gulp tasks.
 *
 * Created by grahbari on 01/04/2016.
 */

/**
 * @constant {string[]} Constant containing all path to shims dependencies we want in the project.
 */
export const SHIMS_DEPENDENCIES: string[] = [
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/zone.js/dist/zone.js'
];
/**
 * @constant {string[]} Constant containing all path to libraries dependencies we want in the project.
 */
export const LIBS_DEPENDENCIES: string[] = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/tether/dist/js/tether.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'
];

export const BOOT_DEPENDENCIES: string[] = [
    'systemjs.config.js',
    'systemjs.boot.js'
];

export const SYSJS_DEPENDENCIES: string[] = [
    'node_modules/systemjs/dist/system.src.js'
];

/**
 * @constant {string} The path of the development directory.
 */
export const DEV_PATH: string = 'dist/dev';

/**
 * @constant {string} The path of the production directory.
 */
export const PROD_PATH: string = 'dist/prod';

/**
 * @constant {string} Regular expression matching all files.
 */
export const ALL_FILES: string = 'src/**/*';

/**
 * @constant {string} Regular expression matching all typescript files.
 */
export const TYPESCRIPT_FILES: string = 'src/**/*.ts';

/**
 * @constant {string} Regular expression matching all sass files.
 */
export const SASS_FILES: string = 'src/**/*.scss';

/**
 * @constant {string} Regular expression matching all spec files.
 */
export const SPEC_FILES: string = 'src/**/*.spec.ts';

/**
 * @constant {string} The name of the index.
 */
export const INDEX: string = 'index.html';

/**
 * @constant {string} The name of the bundle file.
 */
export const BUNDLE: string = 'bundle.js';

/**
 * @constant {string} The name of the main script.
 */
export const MAIN: string = 'main.js';

/**
 * @constant {string} The name of the systemjs config script.
 */
export const SYSJS_CONFIG: string = 'systemjs.config.js';

/**
 * @constant {string} The libs tag name.
 */
export const LIBS: string = 'libs';

/**
 * @constant {string} The shimd tag name.
 */
export const SHIMS: string = 'shims';

/**
 * @constant {string} The run scripts tag name.
 */
export const BOOT: string = 'boot';