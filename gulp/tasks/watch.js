import gulp from 'gulp';
import {srcDir, testDir} from '../utils/paths';

gulp.task('watch', () => {
    gulp.watch(`${srcDir}/**/*.js`, ['lint']);
    gulp.watch(`${testDir}/**/*.js`, ['lint-tests']);
});
