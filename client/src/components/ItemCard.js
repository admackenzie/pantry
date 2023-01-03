// Core modules
import { useState } from 'react';
// Local modules
import ConfirmModal from './ConfirmModal';
// Third party modules
import { Badge, Card, Dropdown, ListGroup } from 'react-bootstrap';

// TODO: error handling on fetch requests

export default function ItemCard(props) {
	const { fetchData, userID } = props;
	const {
		expiration,
		isExpired,
		isExpiringSoon,
		location,
		name,
		size,
		unit,
	} = props.data;
	const itemID = props.data._id;

	const [quantity, setQuantity] = useState(props.data.quantity);
	const [showModal, setShowModal] = useState(false);

	// PATCH request
	const handleQuantity = async op => {
		// Calculate quantity
		const calcQuantity = (quantity, op) => {
			if (op === 'add') return +quantity + 1;
			else return +quantity >= 1 ? +quantity - 1 : 0;
		};
		const newQuantity = calcQuantity(quantity, op);

		// Response
		await fetch(`/api/users/${userID}/${itemID}`, {
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
		await fetch(`/api/users/${userID}/${itemID}`, { method: 'DELETE' });

		setShowModal(false);

		fetchData(`/users/${userID}`);
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
						<span className="fw-bold">Size:</span>
						<span className="ms-3">
							{size} {unit}
						</span>
					</ListGroup.Item>

					<ListGroup.Item>
						<span className="fw-bold">Expires:</span>

						{/* FIXME: badge needs to be vertically aligned */}
						{/* Expiration state badges*/}
						<span className="ms-3">
							<Badge
								bg="warning"
								className={`me-1 ${
									!isExpiringSoon && 'd-none'
								}`}
							>
								!
							</Badge>
							<Badge
								bg="danger"
								className={`me-1 ${!isExpired && 'd-none'}`}
							>
								X
							</Badge>

							<span
								className={`${
									isExpiringSoon && 'text-warning'
								} ${isExpired && 'text-danger'}`}
							>
								{expiration}
							</span>
						</span>
					</ListGroup.Item>

					<ListGroup.Item>
						<span className="fw-bold">Location:</span>
						<span className="ms-3">{location}</span>
					</ListGroup.Item>
				</ListGroup>

				{/* Options */}
				<Dropdown className="d-flex justify-content-end">
					<Dropdown.Toggle variant="light" id="dropdown-basic">
						Options
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleQuantity('add')}>
							<Badge bg="light" className="me-3">
								➕
							</Badge>
							Add item
						</Dropdown.Item>

						<Dropdown.Item onClick={() => handleQuantity('sub')}>
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

						{/* Delete confirmation */}
						<ConfirmModal
							cancelText="Go back"
							confirmText="Delete"
							handler={handleDelete}
							handlerData={itemID}
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
