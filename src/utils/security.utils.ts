import { sequelize } from '../configs/database.configs';

async function gracefulShutdown() {
	try {
		await sequelize.close();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

export { gracefulShutdown };
