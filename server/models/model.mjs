// Local modules
import { convertDateToDays } from '../utils/helpers.mjs';
// Third party modules
import mongoose from 'mongoose';

const { Schema } = mongoose;

// TODO: add validators

const itemSchema = new Schema({
	name: {
		required: [true, 'Pantry items must have a unique name.'],
		trim: true,
		type: String,
		unique: true,
	},

	size: {
		// required: true,
		type: String,
	},

	unit: {
		// enum: {
		// 	values: ['count', 'fl oz', 'g', 'ml', 'oz'],
		// 	message: `Invalid unit.`,
		// },
		type: String,
	},

	expiration: {
		type: String,
	},

	isExpiringSoon: {
		default: false,
		type: Boolean,
	},

	isExpired: {
		default: false,
		type: Boolean,
	},

	location: {
		type: String,
	},

	quantity: {
		type: Number,
	},

	addedOn: {
		default: new Date().toISOString(),
		select: false,
		type: String,
	},
});

// -------------------------------- MIDDLEWARE --------------------------------

// Document middleware
itemSchema.pre('save', function (next) {
	// Calculate item expiration state
	const expirationDays = convertDateToDays(this.expiration);

	if (expirationDays <= 30 && expirationDays > 0) {
		this.isExpiringSoon = true;
	} else if (expirationDays <= 0) {
		this.isExpiringSoon = false;
		this.isExpired = true;
	}

	// Convert expiration date to an ISO string
	try {
		this.expiration = new Date(this.expiration).toISOString();
	} catch {
		this.expiration = undefined;
	}

	next();
});

// Query middleware
itemSchema.post(/^find/, function (docs, next) {
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

	// Return results sorted by most recently added
	docs = docs.sort((a, b) => (a.addedOn < b.addedOn ? 1 : -1));

	next();
});

export const Item = mongoose.model('Item', itemSchema);
