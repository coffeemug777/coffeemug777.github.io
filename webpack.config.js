var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		'./src/index.js',
		'./src/styles.less',
	],
	output: {
		filename: './dist/bundle.js'
	},
	module: {
		loaders:[
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query 
                    'css-loader?sourceMap!' +
                    'less-loader?sourceMap'
                )
            }
		]
	},
	plugins: [
		// extract CSS into separate file
		new ExtractTextPlugin('./css/styles.css')
	]	
};