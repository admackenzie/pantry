// Local modules
import { authorize, login, signup } from '../controllers/authController.mjs';
import {
	addItem,
	deleteItem,
	editItem,
	getAllItems,
	getItem,
} from '../controllers/itemController.mjs';
import { editLocations, getLocations } from '../controllers/userController.mjs';
// Third party modules
import express from 'express';

const router = express.Router();

// Auth routes
router.route('/authorize').get(authorize);

// Item routes
router.route('/users/:id').post(addItem).get(getAllItems);
router.route('/users/:id/:id').get(getItem).patch(editItem).delete(deleteItem);

// User routes
router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/locations/:id').get(getLocations).patch(editLocations);

export { router };
