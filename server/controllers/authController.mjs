// Local modules
import { User } from '../models/userModel.mjs';
// import { signToken, verifyToken } from '../utils/helpers.mjs';
// Third party modules
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
	try {
		// Creating a new user with the schema fields explicitly specified like this is the safer way to handle this, vs const newUser = await User.create(req.body). The latter poses a security risk where adversaries can create accounts with admin privileges. As a result of this, no new admin accounts can be created, but accounts can be altered in the DB to add privileges
		const newUser = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
		});

		const token = signToken(newUser._id);

		res.status(201).json({
			status: 'success',
			token,
			data: {
				user: newUser,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'failure',
			error: { error },
		});
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if email and password exist
		if (!username || !password) {
			// FIXME: Implement a better version of this
			throw new Error('Please provide email and password.');
		}

		// Check if user exists and password is correct
		// .select shows a field that that defined select: false in the schema
		const user = await User.findOne({ username }).select('+password');

		// .testPassword is a method defined on the userSchema
		if (!user || !(await user.testPassword(password, user.password))) {
			throw new Error('Invalid email or password.');
		}

		// Respond with JWT
		const token = signToken(user._id);

		res.status(200).json({
			status: 'success',
			token,
		});
	} catch (error) {
		res.status(404).json({
			status: 'failure',
			error: { error },
		});
	}
};

const authorize = async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const payload = verifyToken(token);
		const user = await User.findById(payload.id);

		if (user) {
			res.status(200).json({
				status: 'success',
				data: { user },
			});
		}
	} catch (error) {}
};

// Create JWT for authorization
const signToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRATION,
	});
};

// FIXME: make this async?
const verifyToken = token => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

export { authorize, login, signup };
