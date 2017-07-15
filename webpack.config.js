const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		vendor: [
			'materialize-loader!./scripts/materialize/materialize.config', 
			'./node_modules/materialize-css/dist/js/materialize.min',
			'./node_modules/jquery/dist/jquery.min'
		],
		main: './src/main.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js'
	},
	plugins: [

		// Provider for materialize-css javascript
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.$': 'jquery',
			'window.jQuery': 'jquery'
		}),
		new CleanWebpackPlugin(['dist']),
		new CopyWebpackPlugin([{ from: './src/assets', to: 'assets' }]),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			filename: "commons.js"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin() // scope hoisting
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015']}
				}]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 80000,
						mimetype: "application/font-woff"
					}
				}]
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{ loader: "file-loader" }]
			}
		]
	},

	resolve: {
		alias: {
			'jquery': path.join( __dirname, 'node_modules/jquery/dist/jquery')
		}
	},

	devServer: {
		hot: true,
		contentBase: path.resolve(__dirname, './src'),
		publicPath: '/'
	}
};