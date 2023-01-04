// Local modules
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
// Third party modules
import { Route, Routes } from 'react-router-dom';

export default function App() {
	return (
		<Routes>
			{/* Index */}
			<Route
				element={
					// Redirect to /login before JWT is verified
					<ProtectedRoute
						// Authorize if JWT is in localStorage
						authorized={() => !!localStorage.getItem('JWT')}
					>
						<IndexPage />
					</ProtectedRoute>
				}
				exact
				path="/"
			/>

			{/* Login */}
			<Route element={<LoginPage />} path="/login" />
		</Routes>
	);
}
