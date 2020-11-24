const path = require('path');
const {DefinePlugin} = require('webpack')
const dotenv = require('dotenv')
const HtmlWebPackPlugin = require('html-webpack-plugin');

const basePath = __dirname;
const distPath = 'dist';

module.exports = (env, options) => {
    const envVariables = dotenv.config().parsed
    const envKeys = Object.keys(envVariables).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(envVariables[next]);
        return prev;
    }, {});
    return {
        entry: './src/index.js',
        output: {
            publicPath: '/',
            path: path.resolve(basePath, distPath),
            filename: '[chunkhash][name].js'
        },
        performance: {
            hints: false // Disable assets limit
        },
        module: {
            rules: [{
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              }, {
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, "./src"),
                    path.resolve(__dirname, "node_modules/react-svg-map")
                ],
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: options.mode === 'development', // Avoid to block compilation when ESLint error
                        }
                    }
                ],
            }, {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, "node_modules/react-svg-map")
                ],
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {

                    test: /\.ts|tsx?$/,
                    use: ['babel-loader?babelrc'],
                    include: [
                        path.resolve(__dirname, "node_modules/rsuite")
                    ],

                }]
        },
        resolve: {
            extensions: ['.json', '.js', '.jsx'],
        },
        plugins: [
            new DefinePlugin(envKeys),
            new HtmlWebPackPlugin({
                template: './public/index.html',
                filename: './index.html'
            })
        ]
    };
};
