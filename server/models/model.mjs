// Third party modules
import mongoose from 'mongoose';

const { Schema } = mongoose;

const itemSchema = new Schema({
	name: {
		required: [true, 'Pantry items must have a name.'],
		trim: true,
		type: String,
		unique: true,
	},

	size: {
		type: Number,
	},

	unit: {
		enum: {
			values: ['count', 'fl oz', 'g', 'ml', 'oz'],
			message: `Invalid unit.`,
		},
		type: String,
	},

	expiration: {
		type: Date,
	},

	location: {
		type: String,
	},

	quantity: {
		type: Number,
	},

	addedOn: {
		default: Intl.DateTimeFormat('en-us', { month: 'long' }).format(
			Date.now()
		),
		// select: false,
		type: Date,
	},
});

export const Item = mongoose.model('Item', itemSchema);
