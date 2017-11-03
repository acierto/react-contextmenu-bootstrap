import eslint from 'gulp-eslint';
import gulp from 'gulp';
import {srcDir, unitTestDir} from '../utils/paths';

const lintStream = (stream) => stream
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

gulp.task('lint', () => lintStream(gulp.src(`${srcDir}/**/*.js`)));

gulp.task('lint-tests', () => lintStream(gulp.src(`${unitTestDir}/**/*.js`)));
