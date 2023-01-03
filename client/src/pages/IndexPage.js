// Core  modules
import { useEffect, useState } from 'react';
// Local modules
import ErrorAlert from '../components/ErrorAlert';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
// Third party
import { Container, Col, Row } from 'react-bootstrap';

export default function IndexPage(props) {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	// User data
	const [userID, setUserID] = useState();
	const [userLocations, setUserLocations] = useState();
	const [username, setUsername] = useState();

	//TODO: implement cookies for logged in state

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

	// FIXME: this is firing twice because of a dependency on props.token. Is there an efficient way to get the token within useEffect here?
	// Fetch all items for logged in user
	useEffect(() => {
		const authorize = async () => {
			const res = await fetch('/api/authorize', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${props.token}`,
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
	}, [props.token]);

	return (
		<Container fluid>
			<Header
				{...props}
				fetchData={fetchData}
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
