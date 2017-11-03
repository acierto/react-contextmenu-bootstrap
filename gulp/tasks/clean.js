import del from 'del';
import gulp from 'gulp';
import {distDir} from '../utils/paths';

gulp.task('clean', () => del([distDir], {force: true}));
