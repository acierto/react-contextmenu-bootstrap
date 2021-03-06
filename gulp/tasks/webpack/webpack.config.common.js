import R from 'ramda';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {demoDir, projectDir} from '../../utils/paths';
import {dependencies} from '../../../package.json';

export const exposeLoadersConfig = [
    {
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
        }, {
            loader: 'expose-loader',
            options: 'jquery'
        }, {
            loader: 'expose-loader',
            options: '$'
        }]
    },
    {
        test: require.resolve('react-dom/test-utils'),
        use: [{
            loader: 'expose-loader',
            options: 'ReactTestUtils'
        }]
    },
    {
        test: require.resolve('bean'),
        use: [{
            loader: 'expose-loader',
            options: 'bean'
        }]
    }];

export const rulesConfig = [
    {
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            plugins: ['transform-class-properties', 'transform-decorators-legacy', 'transform-runtime'],
            presets: [['env', {targets: {browsers: ['last 2 versions', 'safari >= 7']}}], 'react', 'stage-0']
        },
        test: /\.js?$/
    },
    {
        test: /\.(jpe?g|png|gif|svg|ico)\??.*$/i,
        use: [
            'file-loader?hash=sha512&digest=hex&name=images/[name]-[hash].[ext]',
            {
                loader: 'image-webpack-loader?bypassOnDebug',
                options: {
                    gifsicle: {interlaced: false},
                    optipng: {optimizationLevel: 7}
                }
            }
        ]
    },
    {loader: 'file-loader?name=fonts/[name].[ext]', test: /\.(ttf|eot|woff)\??.*$/},
    {loader: 'html-loader', test: /\.html$/},
    {
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader?sourceMap',
            'less-loader?sourceMap'
        ]
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
        ]
    }
];

export const pluginsConfig = [
    new webpack.ProvidePlugin({
        '$': 'jquery',
        '_': 'lodash',
        'jquery': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        filename: `vendor.bundle-[hash].js`,
        name: 'vendor'
    }),
    new HtmlWebpackPlugin({
        title: 'Context Menu',
        template: `${demoDir}/index.ejs`
    })
];

export const entryConfig = {
    main: [`./${demoDir}/index.js`],
    vendor: R.pipe(
        R.keys,
        R.concat([
            'bootstrap/dist/css/bootstrap.css',
            'bootstrap/dist/css/bootstrap-theme.css'
        ])
    )(dependencies)
};

export const outputConfig = {
    filename: `bundle-[hash].js`,
    path: projectDir,
    publicPath: ''
};
