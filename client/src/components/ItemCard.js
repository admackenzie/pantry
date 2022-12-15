// Core modules
import { useState } from 'react';
// Local modules
import ConfirmModal from './ConfirmModal';
// Third party modules
import { Badge, Card, Dropdown, ListGroup } from 'react-bootstrap';

// TODO: error handling on fetch requests

export default function ItemCard(props) {
	const {
		expiration,
		isExpired,
		isExpiringSoon,
		location,
		name,
		size,
		unit,
	} = props.data;
	const [quantity, setQuantity] = useState(props.data.quantity);
	const [showModal, setShowModal] = useState(false);

	// PATCH request
	const handleQuantity = async (id, op) => {
		// Calculate quantity
		const calcQuantity = (quantity, op) => {
			if (op === 'add') return +quantity + 1;
			else return +quantity >= 1 ? +quantity - 1 : 0;
		};
		const newQuantity = calcQuantity(quantity, op);

		// Response
		await fetch(`/api/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				quantity: newQuantity,
			}),
		});

		// const data = await res.json();
		// console.log(data);

		setQuantity(newQuantity);
	};

	// DELETE request
	const handleDelete = async id => {
		await fetch(`/api/${id}`, { method: 'DELETE' });

		setShowModal(false);

		props.fetchData();
	};

	return (
		<Card>
			<Card.Body>
				{/* Header */}
				<Card.Title className="d-flex fs-1 justify-content-between">
					{name}

					<Badge bg="secondary">{quantity}</Badge>
				</Card.Title>

				{/* Body */}
				<ListGroup bg="light" className="fs-2" variant="flush">
					<ListGroup.Item>
						Size: {size} {unit}
					</ListGroup.Item>
					<ListGroup.Item className="d-flex justify-content-between">
						<>Expires: {expiration}</>

						{/* Expiration state badges*/}
						<>
							<Badge
								bg="warning"
								className={`my-auto justify-content-end ${
									!isExpiringSoon && 'd-none'
								}`}
							>
								!
							</Badge>
							<Badge
								bg="danger"
								className={`my-auto ${!isExpired && 'd-none'}`}
							>
								X
							</Badge>
						</>
					</ListGroup.Item>
					<ListGroup.Item>Location: {location}</ListGroup.Item>
				</ListGroup>

				{/* Options */}
				<Dropdown className="d-flex justify-content-end">
					<Dropdown.Toggle variant="light" id="dropdown-basic">
						Options
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item
							onClick={() =>
								handleQuantity(props.data._id, 'add')
							}
						>
							<Badge bg="light" className="me-3">
								➕
							</Badge>
							Add item
						</Dropdown.Item>

						<Dropdown.Item
							onClick={() =>
								handleQuantity(props.data._id, 'sub')
							}
						>
							<Badge bg="light" className="me-3">
								➖
							</Badge>
							Take item
						</Dropdown.Item>

						<Dropdown.Divider />

						<Dropdown.Item onClick={() => setShowModal(true)}>
							<Badge bg="danger" className="me-3">
								X
							</Badge>
							Delete item
						</Dropdown.Item>

						{/* Delete confirmation modal */}
						<ConfirmModal
							cancelText="Go back"
							confirmText="Delete"
							handler={handleDelete}
							handlerData={props.data._id}
							modalState={showModal}
							setModalState={setShowModal}
							titleText="Are you sure you want to delete this item?"
						/>
					</Dropdown.Menu>
				</Dropdown>
			</Card.Body>
		</Card>
	);
}
