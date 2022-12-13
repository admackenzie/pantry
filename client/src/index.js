// Core modules
import React from 'react';
import ReactDOM from 'react-dom/client';
//Local modules
import App from './App';
// Third party modules
import { BrowserRouter } from 'react-router-dom';
// Stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
