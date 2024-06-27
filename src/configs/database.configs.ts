import { Sequelize } from 'sequelize';

const DATABASE_URL = process.env.DATABASE_URL as string;
const sequelize = new Sequelize(DATABASE_URL, {
	logging: () =>
		process.env.NODE_ENV === 'development' ? console.log : false,
	dialect: 'postgres',
});

async function connectDatabase() {
	try {
		await sequelize.authenticate();
		console.info(
			'✅ Database connection has been established successfully',
		);

		await sequelize.sync({ alter: true });
		console.info('✅ All models were synchronized successfully');
	} catch (error) {
		console.error('❌ Error connecting to database:', error);
		await sequelize.close();
		process.exit(1);
	}
}

export default connectDatabase;
export { Sequelize, sequelize };
