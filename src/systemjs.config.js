(function(global) {

    var  map = {
        'main':                       'main.js',
        '@angular':                   'node_modules/@angular',
        'rxjs':                       'node_modules/rxjs',
        'typescript':                 'node_modules/typescript/lib/typescript.js',
        'ng2-datetime-picker':        'node_modules/ng2-datetime-picker'
    };

    var packages = {
        'rxjs':                       { defaultExtension: 'js' },
        'ng2-datetime-picker':        { main: 'dist/index.js', defaultExtension: 'js' }
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

    System.import('main').catch(function(err){ console.error(err); });
})(this);