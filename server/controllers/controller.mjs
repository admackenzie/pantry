import { Item } from '../models/model.mjs';

// -------------------------------- CREATE --------------------------------
// TODO: runValidators: true ??

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
		const items = await Item.find(req.query, { __v: 0 });

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
