import gulp from 'gulp';
import gulpGitbook from 'gulp-gitbook';
import runSequence from 'run-sequence';
import {destDocsDir, srcDocsDir} from '../utils/paths';

gulp.task('generate-docs', (cb) => gulpGitbook(srcDocsDir, cb));

gulp.task('copy-docs', () => {
    gulp
        .src(`${srcDocsDir}/_book/**`)
        .pipe(gulp.dest(destDocsDir));
});

gulp.task('build-docs', (cb) => runSequence('generate-docs', 'copy-docs', cb));