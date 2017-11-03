import gulp from 'gulp';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import Q from 'q';
import webpackDevConfig from './webpack/webpack.config.dev';
import webpackTestConfig from './webpack/webpack.config.test';
import {appPort} from '../utils/connection';

const startServer = (config) => {
    const serverStarted = Q.defer();

    const webpackInstance = webpack(config);
    webpackInstance.plugin('done', () => serverStarted.resolve());

    const server = new WebpackDevServer(webpackInstance, {
        disableHostCheck: true,
        hot: true,
        lazy: false,
        noInfo: false,
        publicPath: config.output.publicPath,
        quiet: false,
        stats: {colors: true}
    });
    server.listen(appPort);
    return serverStarted.promise;
};

gulp.task('test-server', () => startServer(webpackTestConfig));

gulp.task('dev-server', () => startServer(webpackDevConfig));
