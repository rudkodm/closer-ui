import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import * as requireDir from 'require-dir';

require('dotenv').config()
requireDir('./gulp/tasks');

gulp.task('serve:dev', callback =>
    runSequence('build:dev','server:dev', 'watch', callback)
);

gulp.task('serve:prod', callback =>
    runSequence('server:prod')
);

gulp.task('build:dev', callback =>
    runSequence('clean:dev', ['copy:dev', 'ts:dev', 'sass:dev'], 'str:dev', callback)
);

gulp.task('build:prod', callback =>
    runSequence('clean:prod', ['copy:prod', 'ts:prod', 'sass:prod'], 'bundle', 'gzip', 'str:prod', callback)
);
