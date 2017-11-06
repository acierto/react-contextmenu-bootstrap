import R from 'ramda';
import webpack from 'webpack';
import {entryConfig, exposeLoadersConfig, rulesConfig, pluginsConfig, outputConfig} from './webpack.config.common';
import {appHost, appPort} from '../../utils/connection';

export default {
    devServer: {
        contentBase: '/',
        hot: true,
        port: appPort,
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    entry: R.evolve({
        main: R.concat([
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://${appHost}:${appPort}`,
            'webpack/hot/only-dev-server',
            'react-dom/test-utils',
            'bean',
            './demo/index'
        ])
    }, entryConfig),
    module: {rules: [...exposeLoadersConfig, ...rulesConfig]},
    output: outputConfig,
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        ...pluginsConfig
    ]
};
