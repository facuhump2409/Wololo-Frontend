/*eslint-env node*/
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
	return {
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, './'),
			filename: 'index.js',
		},
		performance: {
			hints: false // Disable assets limit
		},
		devServer: {
			historyApiFallback: true,
			proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api' : ''}
      }
		}
	},
		module: {
			rules: [{
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
				}]
		},
		resolve: {
			extensions: ['.json', '.js', '.jsx'],
		},
		plugins: [
			new HtmlWebPackPlugin({
				template: './public/index.html',
				filename: './index.html'
			})
		]
	};
};