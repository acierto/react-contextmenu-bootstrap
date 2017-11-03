import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import {entryConfig, rulesConfig, pluginsConfig, outputConfig} from './webpack.config.common';

export default {
    entry: entryConfig,
    module: {
        loaders: [
            {
                include: /node_modules/,
                loaders: ['strip-sourcemap-loader'],
                test: /\.js$/
            },
            {loader: 'expose-loader?$', test: require.resolve('jquery')},
            ...rulesConfig
        ]
    },
    output: outputConfig,
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
        new UglifyJSPlugin({uglifyOptions: {compress: {drop_console: true, warnings: false}}}),
        ...pluginsConfig
    ]
};
