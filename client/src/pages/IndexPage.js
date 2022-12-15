// Core  modules
import { useEffect, useState } from 'react';
// Local modules
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
// Third party
import { Container, Col, Row } from 'react-bootstrap';

export default function IndexPage() {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	// TODO: improve other async functions to useState like this, or remove bloat from this function like the others

	const fetchData = async () => {
		try {
			const res = await fetch('/api');
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

	if (error) {
		return <>Error: {error.message}</>;
	} else if (!isLoaded) {
		return <>Loading...</>;
	} else {
		return (
			<Container fluid>
				<Header fetchData={fetchData} />

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
}
