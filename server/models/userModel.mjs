// Third party modules
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
// import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		required: [true, 'Username is required.'],
		type: String,
	},

	email: {
		lowercase: true,
		required: [true, 'Email is required.'],
		type: String,
		unique: true,
		// validate: [validator.isEmail, 'Email must be valid.'],
	},

	password: {
		minLength: 8,
		required: [true, 'Password is required.'],
		// Prevent (hashed) password from appearing on queries
		select: false,
		type: String,
	},

	passwordConfirm: {
		required: [true, 'Passwords must match.'],
		type: String,
		// Document validator, will not run on queries (only .create() or .save())
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: 'Passwords do not match.',
		},
	},
	locations: [String],
});

userSchema.pre('save', async function (next) {
	// Run function only if password is modified
	if (!this.isModified('password')) return next();

	// Hash and salt plaintext password with 2^12 hashing iterations
	this.password = await bcrypt.hash(this.password, 12);

	// Prevent passwordConfirm field from being stored in DB
	this.passwordConfirm = undefined;

	next();
});

// Define a method on all User instances to test the entered login password against the hashed password in the database
userSchema.methods.testPassword = async function (candidate, password) {
	return await bcrypt.compare(candidate, password);
};

export const User = mongoose.model('User', userSchema);
