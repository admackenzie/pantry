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

	// Fetch all items
	useEffect(() => {
		fetch('/api')
			.then(res => res.json())
			.then(
				res => {
					setIsLoaded(true);
					setData(res.data.items);
				},
				error => {
					setIsLoaded(true);
					setError(error);
				}
			);
	}, []);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<Container fluid>
				<Header />

				<Row className="g-3" md={2} xs={1}>
					{data.map(item => {
						return (
							<Col key={item.name}>
								<ItemCard data={item} />
							</Col>
						);
					})}
				</Row>
			</Container>
		);
	}
}
