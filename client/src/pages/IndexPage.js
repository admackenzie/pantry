// Core  modules
import { useEffect, useState } from 'react';
// Local modules
import ErrorAlert from '../components/ErrorAlert';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
// Third party
import { Container, Col, Row } from 'react-bootstrap';

export default function IndexPage() {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	// TODO: improve other async functions to useState like this, or remove bloat from this function like the others

	const fetchData = async route => {
		route = route ?? '/';

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

	// Fetch all items
	useEffect(() => fetchData, []);

	return (
		<Container fluid>
			<Header fetchData={fetchData} />

			{/* Data fetch error message*/}
			{error && (
				<ErrorAlert text={`Error: ${error.message}`} variant="danger" />
			)}

			{/* Page loading message*/}
			{!isLoaded && <ErrorAlert text="Loading..." variant="light" />}

			{/* Search error message */}
			{isLoaded && data.length === 0 && (
				<ErrorAlert text="No results found." variant="secondary" />
			)}

			{/* Successful data display */}
			<Row className="g-3" md={2} xs={1}>
				{data.map(item => {
					return (
						<Col key={item._id}>
							<ItemCard data={item} fetchData={fetchData} />
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}
