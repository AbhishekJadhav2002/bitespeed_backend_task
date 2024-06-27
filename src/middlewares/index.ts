import cors from 'cors';
import * as express from 'express';
import { Express } from 'express';
import helmet from 'helmet';

function middlewares(server: Express): Express {
	server.use([
		helmet({ contentSecurityPolicy: false }),
		cors({
			maxAge: 84600,
			origin:
				(process.env.NODE_ENV as string) === 'development'
					? '*'
					: [process.env.PUBLIC_FACING_URLS as string],
		}),
		express.json(),
	]);

	return server;
}

export default middlewares;
