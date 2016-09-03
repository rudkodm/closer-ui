import * as gulp from 'gulp';
import {PROD_PATH, MAIN, BUNDLE, SYSJS_CONFIG} from "../gulp.conf";
const Builder = require('systemjs-builder');
const gzip   = require('gulp-gzip');


function bundleTask() {
    let builder = new Builder('', prodPath(SYSJS_CONFIG));
    return builder
        .buildStatic(prodPath(MAIN), prodPath(BUNDLE), { minify: true, sourceMaps: true})
        .then(function() {
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
}

function gzipTask() {
    return gulp.src(prodPath('**/*.{html,xml,json,css,js}'))
        .pipe(gzip({}))
        .pipe(gulp.dest(PROD_PATH));
}

function prodPath(file: string) {
    return `${PROD_PATH}/${file}`
}


gulp.task('bundle', bundleTask);
gulp.task('gzip', gzipTask);

