/**
 * @params {`statusCode`, `message`}
 */
export class AppError extends Error {
	status: number;

	message: string;

	constructor(statusCode: number, message: string) {
		super(message);
		this.status = statusCode ?? 500;
		this.message = message ?? 'Something went wrong';
	}
}
