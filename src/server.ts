import 'dotenv/config';
import express from 'express';
import middlewares from './middlewares';
import router from './routes';
import connectDatabase from './configs/database.configs';

let app = express();

app = middlewares(app);

app.use(router);

app.listen(process.env.PORT || 5000, async () => {
	await connectDatabase();
	console.info(`🚀 Server is running on port ${process.env.PORT || 5000}`);
});
