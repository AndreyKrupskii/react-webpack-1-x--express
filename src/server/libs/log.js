import winston from 'winston';

const env = process.env.NODE_ENV;

export default function getLogger(module) {
	const path = module.filename.split('/').slice(-2).join('/');
	return new winston.Logger({
		transports: [
			new winston.transports.Console({
				level: env == 'prodaction' ? 'error' : 'debug',
				showLevel: true,
				colorize: true,
				label: path
			})
		]
	});
}