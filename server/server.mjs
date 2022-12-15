// Local modules
import { router } from './views/views.mjs';
// Third party modules
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// Import config.env file
dotenv.config({ path: './config.env' });

// Configure express
const app = express();
app.use(express.json());
app.use('/api', router);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`✅ Server connected on port ${PORT}.`);
});

// Database
const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);
mongoose
	.connect(DB)
	.then(() => console.log('✅ Database connection successful.'));
