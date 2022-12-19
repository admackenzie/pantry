import { Item } from '../models/itemModel.mjs';

// -------------------------------- CREATE --------------------------------
// TODO: runValidators: true ??
// TODO: better error handling

// POST new item
const addItem = async (req, res) => {
	try {
		const newItem = await Item.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				item: newItem,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'failed',
			message: error,
		});
	}
};

// -------------------------------- READ --------------------------------
// GET all
const getAllItems = async (req, res) => {
	try {
		// Allow name parameter in queries
		const re = new RegExp(`${req.query.name ?? ''}`, 'i');

		// Return items ordered by most recently added as default
		let items = await Item.find({ name: { $regex: re } }, { __v: 0 }).sort(
			req.query.sort ?? '-addedOn'
		);

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

// GET single
const getItem = async (req, res) => {
	try {
		const item = await Item.findById(req.params.id, { __v: 0 });

		res.status(200).json({
			status: 'success',
			data: { item },
		});
	} catch (error) {
		res.status(404).json({
			status: 'failed',
			error: error,
		});
	}
};

// -------------------------------- UPDATE --------------------------------
// TODO: runValidators: true ??

// PATCH item
const editItem = async (req, res) => {
	try {
		const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			// runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			data: { item },
		});
	} catch (error) {
		res.status(404).json({
			status: 'failed',
			message: error,
		});
	}
};

// -------------------------------- DELETE --------------------------------
// DELETE item
const deleteItem = async (req, res) => {
	try {
		await Item.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(404).json({
			status: 'failed',
			message: error,
		});
	}
};

export { addItem, deleteItem, editItem, getAllItems, getItem };
