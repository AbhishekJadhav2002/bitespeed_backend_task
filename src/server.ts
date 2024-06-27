import 'dotenv/config';
import express from 'express';
import connectDatabase from './configs/database.configs';
import middlewares from './middlewares';
import router from './routes';
import { gracefulShutdown } from './utils/security.utils';

let app = express();

app = middlewares(app);

app.use(router);

app.listen(process.env.PORT || 5000, async () => {
	try {
		await connectDatabase();
		console.info(
			`🚀 Server is running on port ${process.env.PORT || 5000}`,
		);
	} catch (error) {
		await gracefulShutdown();
	}
});

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
