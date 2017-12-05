import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import plumber from 'gulp-plumber';
import {distDir, docsDemoDir, srcDir} from '../utils/paths';
import webpackDemoConfig from './webpack/webpack.config.demo';
import webpackTestConfig from './webpack/webpack.config.test';
import webpackProdConfig from './webpack/webpack.config.prod';

const createDist = (config, gulpDestDir) => gulp
    .src(`${srcDir}/**/*.js`)
    .pipe(plumber())
    .pipe(webpackStream(config, webpack))
    .pipe(gulp.dest(gulpDestDir));

gulp.task('webpack-demo', () => createDist(webpackDemoConfig, docsDemoDir));
gulp.task('webpack-production', () => createDist(webpackProdConfig, distDir));
gulp.task('webpack-test', () => createDist(webpackTestConfig, distDir));
