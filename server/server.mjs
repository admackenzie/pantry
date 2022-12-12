import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// Import config.env file
dotenv.config({ path: './config.env' });

const app = express();

app.get('/api', (req, res) => {
	res.json('Server connected.');
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`🟢 Server listening on port ${PORT}.`);
});

// Database
const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);
mongoose
	.connect(DB)
	.then(() => console.log('🟢 Database connection successful.'));
