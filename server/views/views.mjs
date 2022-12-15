// Local modules
import {
	addItem,
	deleteItem,
	editItem,
	getAllItems,
	getItem,
} from '../controllers/controller.mjs';
// Third party modules
import express from 'express';

const router = express.Router();

router.route('/').post(addItem).get(getAllItems);
router.route('/:id').get(getItem).patch(editItem).delete(deleteItem);

export { router };
