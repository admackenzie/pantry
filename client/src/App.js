// Core modules
import { useState } from 'react';
// Local modules
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
// Third party modules
import { Route, Routes } from 'react-router-dom';

export default function App() {
	const [token, setToken] = useState(null);
	const handleAuth = token => setToken(token);

	return (
		<Routes>
			{/* Redirect to /login before JWT is verified */}
			<Route
				element={
					<ProtectedRoute authorized={token}>
						<IndexPage setToken={setToken} token={token} />
					</ProtectedRoute>
				}
				exact
				path="/"
			/>

			<Route
				element={<LoginPage handleAuth={handleAuth} />}
				path="/login"
			/>
		</Routes>
	);
}
