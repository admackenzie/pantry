import { convertDateToDays } from '../utils/helpers.mjs';

const documentStack = obj => {
	// Calculate item expiration state
	const expirationDays = convertDateToDays(obj.expiration);

	// if (expirationDays <= 30 && expirationDays > 0) {
	// 	obj.isExpiringSoon = true;
	// } else if (expirationDays <= 0) {
	// 	obj.isExpiringSoon = false;
	// 	obj.isExpired = true;
	// }

	// Capitalize first letter of name
	obj.name = obj.name[0].toUpperCase() + obj.name.slice(1);

	// Convert expiration date to an ISO string
	try {
		obj.expiration = new Date(obj.expiration).toISOString();
	} catch {
		obj.expiration = undefined;
	}
};

const queryStack = docs => {
	docs = Array.isArray(docs) ? docs : [docs];

	for (const doc of docs) {
		try {
			// Calculate item expiration state
			const expirationDays = convertDateToDays(doc.expiration);

			if (!expirationDays) {
				throw new Error();
			} else {
				if (expirationDays <= 30 && expirationDays > 0) {
					doc.isExpiringSoon = true;
				} else if (expirationDays <= 0) {
					doc.isExpiringSoon = false;
					doc.isExpired = true;
				}
			}

			// Convert expiration ISO strings to a readable format
			doc.expiration = Intl.DateTimeFormat('en-us', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}).format(new Date(doc.expiration));
		} catch {
			doc.expiration = 'N/A';
		}

		// Default display options if data is missing from DB
		doc.size = doc.size ?? 'N/A';
		doc.unit = doc.unit ?? '';
		doc.location = doc.location ?? 'Unknown';
		doc.quantity = doc.quantity ?? 1;
	}

	// FIXME: this is not working
	// Return results sorted by most recently added
	// docs = docs.sort((a, b) => (a.addedOn < b.addedOn ? 1 : -1));
};

export { documentStack, queryStack };
