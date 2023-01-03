// Core modules
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, ...props }) {
	const { authorized } = props;

	if (!authorized) {
		return <Navigate replace to="/login" />;
	}

	return children;
}
