import { Item } from '../models/model.mjs';

const getAllItems = async (req, res) => {
	try {
		const items = await Item.find(req.query);

		res.status(200).json({
			status: 'success',
			results: items.length,
			data: { items },
		});
	} catch (error) {
		res.status(404).json({
			status: 'failed',
			error: error,
		});
	}
};

export { getAllItems };
