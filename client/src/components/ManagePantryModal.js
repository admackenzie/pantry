// Core modules
import { useEffect, useState } from 'react';
// Local modules
import ErrorAlert from './ErrorAlert';
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
	const { modalState, setModalState, userID } = props;

	// Display list of locations to add
	const [locationsLocal, setLocationsLocal] = useState([]);
	const [locationsDB, setLocationsDB] = useState(props.userLocations);

	// Save button display state
	const [saveDisabled, setSaveDisabled] = useState(true);

	// Display state for DB locations
	const [viewLocations, setViewLocations] = useState(false);

	useEffect(() => {
		// Disable save button unless at least one new location is added.
		const testDisabled = arr => arr.length < 1;
		const isSaveDisabled = testDisabled(locationsLocal);
		setSaveDisabled(isSaveDisabled);

		// Update display as locations are added or removed
		setLocationsLocal(locationsLocal);
	}, [locationsLocal, locationsDB]);

	// Add or remove locations from User model
	const editLocations = async (e, method) => {
		let newLocations;

		if (method === 'add') {
			newLocations = [...locationsLocal, ...locationsDB].sort();

			resetForm();
		} else if (method === 'delete') {
			const temp = [...locationsDB];

			temp.splice(+e.target.value, 1, '');

			newLocations = temp.filter(Boolean);
		}

		// PATCH request
		fetch(`/api/locations/${userID}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				locations: newLocations,
			}),
		});

		// GET request
		const res = await fetch(`/api/locations/${userID}`);
		const {
			data: { locations },
		} = await res.json();

		// Update state with added or removed locations
		setLocationsDB(locations);
	};

	// Clear form data
	const resetForm = () => {
		setLocationsLocal([]);
		setViewLocations(false);
		setModalState(false);
	};

	// Add or remove location from display
	const updateDisplay = (e, method) => {
		e.preventDefault();

		// Remove
		if (method === 'remove') {
			const temp = [...locationsLocal];

			// Remove location from array
			temp.splice(+e.target.value, 1, '');
			setLocationsLocal(temp.filter(Boolean));
		}
		// Add
		else {
			const input = e.target['location'];

			setLocationsLocal([...locationsLocal, input.value]);

			input.value = '';
			input.focus();
		}
	};

	return (
		<Modal
			backdrop="static"
			centered
			onHide={resetForm}
			show={modalState}
			size="lg"
		>
			<Modal.Header closeButton>
				<Modal.Title>Manage pantry</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{/* Input new location */}
				<Form onSubmit={e => updateDisplay(e, 'add')}>
					<InputGroup className="mb-3" size="lg">
						<Form.Control
							name="location"
							placeholder="Add new pantry location"
							required
							type="text"
						/>
						<Button
							className="ms-1"
							type="submit"
							variant="primary"
						>
							+
						</Button>
					</InputGroup>
				</Form>

				{/* Display locations to add and X button*/}
				<ListGroup variant="flush">
					{locationsLocal.map((location, i) => {
						return (
							<ListGroup.Item
								className="d-flex justify-content-between"
								key={i}
							>
								<span>{location}</span>

								<CloseButton
									onClick={e => updateDisplay(e, 'remove')}
									value={i}
								/>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</Modal.Body>

			<Modal.Footer>
				<Button
					className="me-auto"
					onClick={() => setViewLocations(!viewLocations)}
				>
					View locations
				</Button>

				<Button onClick={resetForm} variant="secondary">
					Go back
				</Button>

				<Button
					disabled={saveDisabled}
					onClick={e => editLocations(e, 'add')}
					variant="primary"
				>
					Save
				</Button>
			</Modal.Footer>

			{/* View locations display */}
			<Modal.Body className={!viewLocations && 'd-none'}>
				<ListGroup variant="flush">
					{locationsDB.length < 1 ? (
						<ErrorAlert
							text="No stored pantry locations."
							variant="light"
						/>
					) : (
						locationsDB.map((location, i) => {
							return (
								<ListGroup.Item
									className="d-flex justify-content-between"
									key={i}
								>
									<span>{location}</span>

									<CloseButton
										onClick={e =>
											editLocations(e, 'delete')
										}
										value={i}
									/>
								</ListGroup.Item>
							);
						})
					)}
				</ListGroup>
			</Modal.Body>
		</Modal>
	);
}
