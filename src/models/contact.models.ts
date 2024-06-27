import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../configs/database.configs';

interface ContactAttributes {
	id: number;
	phoneNumber: string | null;
	email: string | null;
	linkedId: number | null;
	linkPrecedence: 'primary' | 'secondary';
	deletedAt: Date | null;
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

class Contact
	extends Model<ContactAttributes, ContactCreationAttributes>
	implements ContactAttributes
{
	public id!: number;
	public phoneNumber!: string | null;
	public email!: string | null;
	public linkedId!: number | null;
	public linkPrecedence!: 'primary' | 'secondary';

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public deletedAt!: Date | null;
}

Contact.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		phoneNumber: {
			type: DataTypes.STRING(20),
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		linkedId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Contact,
				key: 'id',
			},
		},
		linkPrecedence: {
			type: DataTypes.ENUM('primary', 'secondary'),
			allowNull: false,
		},
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		sequelize,
		timestamps: true,
		modelName: 'Contact',
		tableName: 'Contact',
		indexes: [
			{
				fields: ['email'],
			},
			{
				fields: ['phoneNumber'],
			},
			{
				fields: ['linkedId'],
			},
			{
				fields: ['linkPrecedence'],
			},
			{
				fields: ['createdAt'],
			},
		],
	},
);

export { Contact, ContactAttributes, ContactCreationAttributes };
