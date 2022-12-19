// Core modules
import { useState } from 'react';
// Third party modules
import {
	Button,
	CloseButton,
	Form,
	InputGroup,
	ListGroup,
	Modal,
} from 'react-bootstrap';

export default function ManagePantryModal(props) {
	// List of locations to add
	const [locations, setLocations] = useState([]);

	// Add location to display
	const addLocation = e => {
		e.preventDefault();

		setLocations([...locations, e.target['location'].value]);
	};

	// Remove location from display
	const removeLocation = e => {
		const temp = [...locations];

		// Hide element
		e.target.parentElement.classList.add('d-none');

		// Remove location from array
		temp.splice(+e.target.value, 1, '');
		setLocations(temp);
	};

	// Blank form
	const resetForm = () => {
		setLocations([]);
		props.setModalState(false);
	};

	return (
		<Modal
			backdrop="static"
			centered
			onHide={resetForm}
			show={props.modalState}
			size="lg"
		>
			<Modal.Header closeButton>
				<Modal.Title>Manage pantry</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{/* Input new location */}
				<Form onSubmit={addLocation}>
					<InputGroup className="mb-3" size="lg">
						<Form.Control
							name="location"
							placeholder="Add new pantry location"
							required
							type="text"
						/>
						<Button type="submit" variant="primary">
							+
						</Button>
					</InputGroup>
				</Form>

				{/* Display locations to add and X button*/}
				<ListGroup variant="flush">
					{locations.map((location, i) => {
						return (
							<ListGroup.Item
								className="d-flex justify-content-between"
								key={i}
							>
								<span>{location}</span>

								<CloseButton
									onClick={removeLocation}
									value={i}
								/>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={resetForm} variant="secondary">
					Go back
				</Button>

				{/* TODO: PATCH user's document in the DB */}
				<Button type="submit" variant="primary">
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
