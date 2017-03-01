export default function HttpError(status, message) {
	this.name = "HttpError";

	this.status = status || 500;
	this.message = message || 'There is some server troubles';

	if (Error.captureStackTrace) {
		Error.captureStackTrace(this, HttpError);
	} else {
		this.stack = (new Error()).stack;
	}

	Error.call(this, this.status, this.message);
}