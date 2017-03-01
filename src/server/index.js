/*
	********************************
	Application dependencies
	********************************
*/

import config from './../config'

import express  from 'express';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'; 
import path from 'path';

import logger from './libs/log.js';
import HttpError from './libs/HttpError';

import router from './routes';

import includeWebpack from './libs/webpack'
/*
	******************************
	Application init
	********************************
*/

const app = express();
const env = process.env.NODE_ENV;
const log = logger(module);


// Webpack middleware

if (env != 'prodaction'){
	includeWebpack.call(app);
}

// Application uses
app.use(bodyParser.json({limit: '250mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '250mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../../public')));
// app.use(favicon(path.join(__dirname, './../../public', 'favicon.ico')));

app.use('/', router);


// Not found error handler
app.use(function(req, res, next) {
	const status = 404;
	const message = 'I have some troubles with looking for your request.';
	const err = new HttpError(status, message);

	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	log.error(req.url)
	log.error(err);
	
	res.status(err.status || 500);
	res.json(err);
});

// Set application port
const port = process.env.PORT || config.port;

app.listen(port, () => {
	log.info(`Server listening on: ${port}`);
});