const path = require('path')
module.exports = {
    mode: 'production',
    entry: [
        './src/index.js',
        './scss/index.scss'
    ],
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'react-collapse.min.js',
        library: 'ReactCollapse',
        libraryTarget: "umd"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDom'
    },
    modules: {
        rules: [
            {
                test: /\.(js|ts|tsx)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(woff|svg|eot|ttf|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    warnings: false,
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    compressor: {
                        sequences: true,
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {discardComments: {removeAll: true}}],
                },
                canPrint: true
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'react-collapse.min.css'
        })
    ]
}