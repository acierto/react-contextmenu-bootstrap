import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import plumber from 'gulp-plumber';
import {distDir, srcDir} from '../utils/paths';
import webpackDevConfig from './webpack/webpack.config.dev';
import webpackTestConfig from './webpack/webpack.config.test';
import webpackProdConfig from './webpack/webpack.config.prod';

const createDist = (config) => gulp
    .src(`${srcDir}/**/*.js`)
    .pipe(plumber())
    .pipe(webpackStream(config, webpack))
    .pipe(gulp.dest(distDir));

gulp.task('webpack-development', () => createDist(webpackDevConfig));
gulp.task('webpack-production', () => createDist(webpackProdConfig));
gulp.task('webpack-test', () => createDist(webpackTestConfig));
