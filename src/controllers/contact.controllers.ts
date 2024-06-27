import { sequelize } from '../configs/database.configs';
import { NextFunction, Request, Response } from 'express';
import { Contact } from '../models/contact.models';
import {
	createNewContact,
	findExistingContacts,
	updateContactToSecondary,
} from '../services/contact.service';
import { AppError } from '../utils/errors.utils';

export async function identifyContact(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const { email = null, phoneNumber = null } = req.body;

	if (!email && !phoneNumber) {
		throw new AppError(400, 'Email or phone number is required');
	}

	try {
		await sequelize.transaction(async (t) => {
			const existingContacts = await findExistingContacts(
				email,
				phoneNumber,
				t,
			);

			let primaryContact: Contact;
			let secondaryContacts: Contact[] = [];

			if (existingContacts.length === 0) {
				primaryContact = await createNewContact(
					{ email, phoneNumber, linkPrecedence: 'primary' },
					t,
				);
			} else {
				primaryContact = existingContacts[0];
				secondaryContacts = existingContacts.slice(1);

				const needNewSecondary = !secondaryContacts.some(
					(c) => c.email === email && c.phoneNumber === phoneNumber,
				);
				if (needNewSecondary) {
					const newSecondary = await createNewContact(
						{
							email,
							phoneNumber,
							linkedId: primaryContact.id,
							linkPrecedence: 'secondary',
						},
						t,
					);
					secondaryContacts.push(newSecondary);
				}

				for (const contact of secondaryContacts) {
					if (contact.linkPrecedence === 'primary') {
						await updateContactToSecondary(
							{ id: contact.id, linkedId: primaryContact.id },
							t,
						);
					}
				}
			}

			const response = {
				contact: {
					primaryContactId: primaryContact.id,
					emails: [
						primaryContact.email,
						...secondaryContacts.map((c) => c.email),
					].filter((e): e is string => e !== null),
					phoneNumbers: [
						primaryContact.phoneNumber,
						...secondaryContacts.map((c) => c.phoneNumber),
					].filter((p): p is string => p !== null),
					secondaryContactIds: secondaryContacts.map((c) => c.id),
				},
			};

			res.json(response);
		});
	} catch (error) {
		console.error('❗ Error in /identify:', error);
		next(error);
	}
}
