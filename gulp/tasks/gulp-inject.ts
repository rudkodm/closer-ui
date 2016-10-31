import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {getBrowserSync} from '../browsersync';
import {
    DEV_PATH, PROD_PATH, INDEX, SHIMS_DEPENDENCIES, LIBS_DEPENDENCIES, SHIMS, LIBS, DEV_BOOT_DEPENDENCIES,
    SYSJS_DEPENDENCIES, BOOT, PROD_BOOT_DEPENDENCIES, ENV_VARIABLES, ENV
} from '../gulp.conf';

declare const process: any;
declare const require: any;
const series = require('stream-series');
const replace = require('gulp-replace');
const plugins = <any>gulpLoadPlugins();
const bs = getBrowserSync();


/**
 * This function injected secrets that passed through ENV variables.
 * @param destinationDirectory
 */
var envDeclare = function (destinationDirectory: string) {
    let env = process.env;
    console.log(env);
    let config = {
        API_HOST: env.API_HOST,
        GOOGLE_API_KEY: env.GOOGLE_API_KEY,
        AUTH_CLIENT_ID: env.AUTH_CLIENT_ID,
        AUTH_DOMAIN: env.AUTH_DOMAIN
    };
    let env_script = `global.env = ${JSON.stringify(config)}`;
    gulp.src(ENV_VARIABLES, {cwd: destinationDirectory})
        .pipe(replace(ENV, env_script))
        .pipe(gulp.dest(destinationDirectory));
};
/**
 * This function injects :
 * in the INDEX file.
 *
 * @param {string} destinationDirectory - The destination directory.
 * @param bootSrc
 */
function inject(destinationDirectory: string, bootSrc: any) {
    envDeclare(destinationDirectory);

    return gulp.src(INDEX, {cwd: destinationDirectory})
        .pipe(plugins.inject(gulp.src(SHIMS_DEPENDENCIES, {read: false}), {name: SHIMS}))
        .pipe(plugins.inject(gulp.src(LIBS_DEPENDENCIES, {read: false}), {name: LIBS}))
        .pipe(plugins.inject(bootSrc, {name: BOOT}))
        .pipe(gulp.dest(destinationDirectory))
        .pipe(bs.stream());
}

/**
 * This function injects (for development mode) :
 * in the INDEX file.
 */
function injectDev() {
    var sysjsSrcStream = gulp.src(SYSJS_DEPENDENCIES, {read: false});
    var bootSrcStream = gulp.src(DEV_BOOT_DEPENDENCIES, {cwd: DEV_PATH, read: false});
    var stream = series(sysjsSrcStream, bootSrcStream);
    return inject(DEV_PATH, stream);
}

/**
 * This function injects (for production mode) :
 * in the INDEX file.
 */
function injectProd() {
    var stream = gulp.src(PROD_BOOT_DEPENDENCIES, {cwd: PROD_PATH, read: false});
    return inject(PROD_PATH, stream)
}

///////////////////// Inject Tasks /////////////////////

gulp.task('str:dev', injectDev);
gulp.task('str:prod', injectProd);