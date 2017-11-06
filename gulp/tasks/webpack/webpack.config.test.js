import R from 'ramda';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
import {entryConfig, exposeLoadersConfig, rulesConfig, pluginsConfig, outputConfig} from './webpack.config.common';
import {appHost, appPort} from "../../utils/connection";

export default {
    devServer: {
        contentBase: '/ciExplorerDist/libs/js/',
        hot: false,
        port: appPort,
        publicPath: '/'
    },
    entry: R.evolve({
        main: R.concat([
            `webpack-dev-server/client?http://${appHost}:${appPort}`,
            'react-dom/test-utils',
            'bean'
        ])
    }, entryConfig),
    module: {rules: [...exposeLoadersConfig, ...rulesConfig]},
    output: outputConfig,
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
        new webpack.NoEmitOnErrorsPlugin(),
        new UglifyJSPlugin({uglifyOptions: {compress: {drop_console: true, warnings: false}}}),
        ...pluginsConfig
    ]
};
