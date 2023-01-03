import { User } from '../models/userModel.mjs';

// TODO: runValidators: true ??

const editLocations = async (req, res) => {
	try {
		const locations = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				// runValidators: true,
			}
		);

		res.status(200).json({
			status: 'success',
			results: locations.length,
			data: { locations },
		});
	} catch (error) {
		res.status(404).json({
			status: 'failed',
			error: error,
		});
	}
};

const getLocations = async (req, res) => {
	try {
		const { locations } = await User.findOne({ _id: req.params.id });

		res.status(200).json({
			status: 'success',
			results: locations.length,
			data: { locations },
		});
	} catch (error) {
		res.status(404).json({
			status: 'failed',
			error: error,
		});
	}
};

export { editLocations, getLocations };
