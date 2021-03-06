(function(global) {

    var  map = {
        'main':                       'main.js',
        '@angular':                   'node_modules/@angular',
        'rxjs':                       'node_modules/rxjs',
        'typescript':                 'node_modules/typescript/lib/typescript.js',
        'ng2-datetime-picker':        'node_modules/ng2-datetime-picker',
        'ng2-bs4-modal':              'node_modules/ng2-bs4-modal',
        'angular2-google-maps':       'node_modules/angular2-google-maps',
        'lodash':                     'node_modules/lodash/lodash.js',
        'angular2-jwt':               'node_modules/angular2-jwt',
        'js-base64':                  'node_modules/js-base64',
        'buffer':                     '@empty'
    };

    var packages = {
        'rxjs':                       { defaultExtension: 'js' },
        'ng2-datetime-picker':        { main: 'dist/index.js', defaultExtension: 'js' },
        'angular2-google-maps/core':  { main: 'index.js', defaultExtension: 'js' },
        'angular2-jwt':               { main: 'angular2-jwt.js', defaultExtension: 'js' },
        'js-base64':                  { main: 'base64.js', defaultExtension: 'js' }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'upgrade',
        'forms',
        'router-deprecated',
        'router'
    ];

    function packNgIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    function packNgUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    var setPackageConfig = System.packageWithIndex ? packNgIndex : packNgUmd;
    ngPackageNames.forEach(setPackageConfig);

    var config = {
        defaultJSExtensions: true,
        map: map,
        packages: packages
    };

    System.config(config);

    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

})(this);
