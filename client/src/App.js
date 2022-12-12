import { useEffect, useState } from 'react';

export default function App() {
	// Fetch backend data
	const [backendData, setBackendData] = useState();
	useEffect(() => {
		fetch('/api')
			.then(res => res.json())
			.then(data => setBackendData(data));
	}, []);

	return <div>{backendData}</div>;
}
