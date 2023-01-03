import { Badge, Card, Dropdown, ListGroup, Placeholder } from 'react-bootstrap';

export default function PlaceholderCard() {
	return (
		<Card>
			<Card.Body>
				{/* Header */}
				<Placeholder
					animation="wave"
					as={Card.Title}
					className="d-flex fs-1 justify-content-between"
				>
					<Placeholder bg="secondary" xs={8} />

					<Placeholder as={Badge} bg="dark">
						{String.fromCharCode(160)}
						{String.fromCharCode(160)}
					</Placeholder>
				</Placeholder>

				{/* Body */}
				<ListGroup className="fs-2" variant="flush">
					<ListGroup.Item>
						<span className="fw-bold">Size:</span>

						<Placeholder animation="wave" className="ms-3">
							<Placeholder bg="secondary" xs={3} />
							<Placeholder
								bg="secondary"
								className="ms-1"
								xs={2}
							/>
						</Placeholder>
					</ListGroup.Item>

					<ListGroup.Item>
						<span className="fw-bold">Expires:</span>

						<Placeholder animation="wave" className="ms-3">
							<Placeholder bg="secondary" xs={8} />
						</Placeholder>
					</ListGroup.Item>

					<ListGroup.Item>
						<span className="fw-bold">Location:</span>

						<Placeholder animation="wave" className="ms-3">
							<Placeholder bg="secondary" xs={6} />
						</Placeholder>
					</ListGroup.Item>
				</ListGroup>

				{/* Options */}
				<Dropdown className="d-flex justify-content-end">
					<Dropdown.Toggle variant="light" id="dropdown-basic">
						Options
					</Dropdown.Toggle>
				</Dropdown>
			</Card.Body>
		</Card>
	);
}
