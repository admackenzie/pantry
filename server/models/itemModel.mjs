// Local modules
import { documentStack, queryStack } from '../middleware/itemModelStack.mjs';
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
		// default: false,
		type: Boolean,
	},

	isExpired: {
		// default: false,
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
		// select: false,
		type: String,
	},
	userID: {
		required: true,
		type: String,
	},
});

/*
Document middleware:
 - Capitalize the first letter of name
 - Convert expiration date to an ISO string
*/
itemSchema.pre('save', function (next) {
	documentStack(this);
	next();
});

/* 
Query middleware:
 - Calculate expiration state (isExpiringSoon, isExpired, or neither)
 - Convert expiration ISO strings to a readable en-us format
 - Assign default size, unit, location, and quantity values if the document lacks that data
*/
itemSchema.post(/^find/, function (docs, next) {
	queryStack(docs);
	next();
});

export const Item = mongoose.model('Item', itemSchema);
