// Local modules
import { getAllItems } from '../controllers/controller.mjs';
// Third party modules
import express from 'express';

const router = express.Router();

router.route('/').get(getAllItems);

export { router };
