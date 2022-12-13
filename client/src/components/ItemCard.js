// Third party modules
import { Badge, Button, ButtonGroup, Card, ListGroup } from 'react-bootstrap';

export default function ItemCard({ ...props }) {
	const { expiration, location, name, quantity, size, unit } = props.data;

	return (
		<Card>
			<Card.Body>
				{/* Head */}
				<Card.Title className="d-flex fs-1 justify-content-between">
					{name}
					<div>
						<Badge bg="secondary" className="mx-3">
							{quantity || 0}
						</Badge>

						<ButtonGroup size="lg">
							<Button variant="primary">+</Button>
							<Button variant="primary">-</Button>
						</ButtonGroup>
					</div>
				</Card.Title>

				{/* Body */}
				<ListGroup className="fs-2" variant="flush">
					<ListGroup.Item>
						{size || 'N/A'} {unit || ''}
					</ListGroup.Item>
					<ListGroup.Item>
						<strong>Expires:</strong> {expiration || 'N/A'}
					</ListGroup.Item>
					<ListGroup.Item>
						<strong>Location:</strong> {location || '???'}
					</ListGroup.Item>
				</ListGroup>
			</Card.Body>
		</Card>
	);
}
