import * as gulp from 'gulp';
import {DEV_PATH, PROD_PATH} from '../gulp.conf';
import * as historyApiFallback from 'connect-history-api-fallback';
import {getBrowserSync} from '../browsersync';
var compress = require('compression');

let bs = getBrowserSync();

/**
 * This function initialises the server in development mode.
 */
function serverDev() {
    bs.init({
        server: {
            baseDir: DEV_PATH + '/',
            routes: {
                "/node_modules": "node_modules"
            }
        },
        injectChanges: true,
        middleware: [historyApiFallback()],
    });
}

/**
 * This function initialises the server in production mode.
 */
function serverProd() {
    bs.init({
        server: {
            baseDir: PROD_PATH + '/',
            routes: {
                "/node_modules": "node_modules"
            }
        },
        middleware: [historyApiFallback(), compress()],
        ghostMode: false,
        ui: false,
        notify: false,
        port: process.env.PORT || 3000
    });
}

///////////////////// Copy Tasks /////////////////////

gulp.task('server:dev', serverDev);
gulp.task('server:prod', serverProd);