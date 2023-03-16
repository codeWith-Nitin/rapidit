// remote-app/webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('./package.json');

const domain = process.env.PRODUCTION_DOMAIN;

module.exports = {
	entry: './src/index',
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/mainapp/latest/',
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
			remotes: {
				auth: `auth@${domain}/moduleEntry.js`,
			},
			exposes: {
				'./App': './src/App',
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
