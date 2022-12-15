// Calculate the time in days between a date and the current time
const convertDateToDays = date => {
	const days = Math.floor((new Date(date).getTime() - Date.now()) / 86400000);

	return isNaN(days) ? undefined : days;
};

export { convertDateToDays };
