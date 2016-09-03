import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {getBrowserSync} from '../browsersync';
import {
    DEV_PATH, PROD_PATH, INDEX, SHIMS_DEPENDENCIES, LIBS_DEPENDENCIES, SHIMS, LIBS, BOOT_DEPENDENCIES,
    SYSJS_DEPENDENCIES, BOOT, BUNDLE
} from '../gulp.conf';

const series = require('stream-series');
const plugins = <any>gulpLoadPlugins();
const bs = getBrowserSync();

/**
 * This function injects :
 * in the INDEX file.
 *
 * @param {string} destinationDirectory - The destination directory.
 */
function inject(destinationDirectory: string, bootSrc: any) {
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
    var bootSrcStream = gulp.src(BOOT_DEPENDENCIES, {cwd: DEV_PATH, read: false});
    var stream = series(sysjsSrcStream, bootSrcStream);
    return inject(DEV_PATH, stream);
}

/**
 * This function injects (for production mode) :
 * in the INDEX file.
 */
function injectProd() {
    var stream = gulp.src(BUNDLE, {cwd: PROD_PATH, read: false});
    return inject(PROD_PATH, stream)
}

///////////////////// Inject Tasks /////////////////////

gulp.task('inject:dev', injectDev);
gulp.task('inject:prod', injectProd);