import config from './../../config';

export default function includeWebpack(){
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpackConfig = require('./../../../webpack.config');

	const compiler = webpack(webpackConfig);
	this.use(
		webpackDevMiddleware(
			compiler,
			{
				publicPath: config.webpackPath,
				stats: {
					colors: true
				},
				watchOptions: {
					aggregateTimeout: 300,
					poll: true
				},
				serverSideRender: true
			}
			)
		)

	this.use(
		webpackHotMiddleware(
			compiler
			)
		)
}

