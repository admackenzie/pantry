// Local modules
import IndexPage from './pages/IndexPage';
// Third party modules
import { Route, Routes } from 'react-router-dom';

export default function App() {
	return (
		<Routes>
			<Route element={<IndexPage />} exact path="/" />
		</Routes>
	);
}
