// remote-app/webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const { dependencies } = require('./package.json');

module.exports = {
	entry: './src/index',
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		port: 3003,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ['@babel/plugin-transform-runtime'],
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/images/',
						},
					},
				],
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'mainapp',

			filename: 'moduleEntry.js',
			exposes: {
				'./App': './src/App',
				// "./Button": "./src/Button",
			},
			remotes: {
				auth: `auth@http://localhost:3001/moduleEntry.js`,
			},
			shared: {
				...dependencies,
				react: {
					singleton: true,
					requiredVersion: dependencies.react,
				},
				'react-dom': {
					singleton: true,
					requiredVersion: dependencies['react-dom'],
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			favicon: './public/favicon.ico',
			manifest: './public/manifest.json',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	target: 'web',
};
