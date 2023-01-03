// // Third party modules
// import jwt from 'jsonwebtoken';

// Calculate the time in days between a date and the current time
const convertDateToDays = date => {
	const days = Math.floor((new Date(date).getTime() - Date.now()) / 86400000);

	return isNaN(days) ? undefined : days;
};

// // Create JWT for authorization
// const signToken = id => {
// 	return jwt.sign({ id }, process.env.JWT_SECRET, {
// 		expiresIn: process.env.JWT_EXPIRATION,
// 	});
// };

// // FIXME: make this async?
// const verifyToken = token => {
// 	return jwt.verify(token, process.env.JWT_SECRET);
// };

export { convertDateToDays };
