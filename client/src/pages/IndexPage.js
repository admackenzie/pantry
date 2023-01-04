// Core  modules
import { useEffect, useState } from 'react';
// Local modules
import ErrorAlert from '../components/ErrorAlert';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
// Third party
import { Container, Col, Row } from 'react-bootstrap';

export default function IndexPage() {
	/* 
		TODO: MASTER LIST
		
			- try/catch for all fetch requests
			- implement better error handling everywhere
			- tutorial modal on signup 
			- reset password and delete account functionality
			- improve appearance

	*/

	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	// User data
	const [userID, setUserID] = useState();
	const [userLocations, setUserLocations] = useState([]);
	const [username, setUsername] = useState();

	// TODO: improve other async functions to useState like this, or remove bloat from this function like the others
	const fetchData = async route => {
		try {
			const res = await fetch(`/api${route}`);
			const json = await res.json();

			setIsLoaded(true);
			setData(json.data.items);
		} catch (error) {
			setIsLoaded(true);
			setError(error);
		}
	};

	// FIXME: this is firing twice on page load. Once for page render and once for authorize()?
	// Fetch all items for logged in user
	useEffect(() => {
		// console.log('useEffect fired');

		const token = localStorage.getItem('JWT');

		const authorize = async () => {
			const res = await fetch('/api/authorize', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const authorization = await res.json();

			const { _id, locations, username } = authorization.data.user;

			setUserID(_id);
			setUserLocations(locations);
			setUsername(username);

			fetchData(`/users/${_id}`);
		};

		authorize();
	}, []);

	return (
		<Container fluid>
			<Header
				fetchData={fetchData}
				setUserLocations={setUserLocations}
				userID={userID}
				userLocations={userLocations}
				username={username}
			/>

			{/* Data fetch error message*/}
			{error && (
				<ErrorAlert text={`Error: ${error.message}`} variant="danger" />
			)}

			{/* Page loading message*/}
			{!isLoaded && <ErrorAlert text="Loading..." variant="light" />}

			{/* Search error message */}
			{isLoaded && data.length === 0 && (
				<ErrorAlert text="No results found." variant="light" />
			)}

			{/* Successful data display */}
			<Row className="g-3" md={2} xs={1}>
				{data.map(item => {
					return (
						<Col key={item._id}>
							<ItemCard
								data={item}
								fetchData={fetchData}
								userID={userID}
							/>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}
