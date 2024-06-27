import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errors.utils';

export function errorHandler(
	err: Error | AppError,
	_req: Request,
	res: Response,
	next: NextFunction,
): void {
	if (err) {
		let status = 200;
		if (err instanceof AppError) status = err.status;
		else status = res.statusCode === 200 ? 500 : res.statusCode;
		const message = err.message ?? 'Something went wrong';
		res.status(status).json(message);
	} else next();
}

export function healthCheck(_req: Request, res: Response): void {
	res.status(200).send('bitespeed-backend is up and running!');
}

export function notFound(_req: Request, res: Response): void {
	res.status(404).send('Not found');
}
