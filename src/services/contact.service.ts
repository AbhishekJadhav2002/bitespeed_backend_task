import { Contact, ContactCreationAttributes } from '../models/contact.models';
import { Op, Sequelize, Transaction } from 'sequelize';

export async function findExistingContacts(
	email: string | null,
	phoneNumber: string | null,
	transaction: Transaction | null,
) {
	try {
		const conditions = [];
		let linkedIdCondition = '';

		if (email) {
			conditions.push({ email });
			linkedIdCondition = `"contacts"."email" = '${email}'`;
		}
		if (phoneNumber) {
			conditions.push({ phoneNumber });
			if (email) {
				linkedIdCondition += ' AND';
			}
			linkedIdCondition += `"contacts"."phoneNumber" = '${phoneNumber}'`;
		}
		return await Contact.findAll({
			where: {
				[Op.or]: [
					...conditions,
					{
						id: {
							[Op.in]: Sequelize.literal(
								`(SELECT "linkedId" FROM contacts WHERE ${linkedIdCondition})`,
							),
						},
					},
				],
			},
			transaction,
			order: [['createdAt', 'ASC']],
		});
	} catch (error) {
		console.error('❗ Error in findExistingContacts:', error);
		throw error;
	}
}

export async function createNewContact(
	payload: Partial<ContactCreationAttributes> & {
		linkPrecedence: 'primary' | 'secondary';
	},
	transaction: Transaction | null,
) {
	try {
		const { email, phoneNumber, linkedId, linkPrecedence } = payload;
		return await Contact.create(
			{
				email,
				phoneNumber,
				linkedId,
				linkPrecedence,
			},
			{ transaction },
		);
	} catch (error) {
		console.error('❗ Error in createNewContact:', error);
		throw error;
	}
}

export async function updateContactToSecondary(
	payload: Partial<ContactCreationAttributes>,
	transaction: Transaction | null,
) {
	try {
		return await Contact.update(
			{
				linkPrecedence: 'secondary',
				linkedId: payload.linkedId,
			},
			{
				where: { id: payload.id },
				transaction,
				returning: true,
			},
		);
	} catch (error) {
		console.error('❗ Error in updateContactToSecondary:', error);
		throw error;
	}
}
