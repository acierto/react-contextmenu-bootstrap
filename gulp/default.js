import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build-development', (cb) => runSequence('lint', 'webpack-development', cb));

gulp.task('build-production', (cb) => runSequence('lint', 'webpack-production', cb));

gulp.task('build-without-lint', (cb) => runSequence('webpack-production', cb));

gulp.task('unit', (cb) => runSequence('lint', 'lint-tests', 'jest', cb));

gulp.task('tests', (cb) => runSequence('unit', 'e2e', cb));

gulp.task('default', (cb) => runSequence('dev-server', 'watch', cb));
