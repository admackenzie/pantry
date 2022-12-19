// Core modules
import { useState } from 'react';
// Third party modules
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';

// TODO: improve error handling

export default function AddItemModal(props) {
	const [sizeDisabled, setSizeDisabled] = useState(false);
	const [expirationDisabled, setExpirationDisabled] = useState(false);
	const [locationDisabled, setLocationDisabled] = useState(false);

	// Blank form
	const resetForm = () => {
		setSizeDisabled(false);
		setExpirationDisabled(false);
		setLocationDisabled(false);
		props.setModalState(false);
	};

	// Retrieve form data and create new Item
	const handleAddItem = async e => {
		e.preventDefault();

		const name = e.target['name'];
		const [size, unit, sizeState] = e.target['size'];
		const [expiration, expirationState] = e.target['expiration'];
		const [location, locationState] = e.target['location'];

		const data = {
			name: name.value,
			size: sizeState.checked ? undefined : size.value,
			unit: sizeState.checked ? undefined : unit.value,
			expiration: expirationState.checked ? undefined : expiration.value,
			location: locationState.checked ? undefined : location.value,
		};

		// POST request
		try {
			await fetch('/api', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			// const json = await res.json();
			// console.log(json);
		} catch (error) {
			console.log(error);
		}

		resetForm();
		props.fetchData();
	};

	return (
		<Modal
			backdrop="static"
			centered
			onHide={() => resetForm()}
			show={props.modalState}
			size="lg"
		>
			<Form onSubmit={handleAddItem}>
				<Modal.Header closeButton>
					<Modal.Title>Add new item to pantry</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Stack gap={4}>
						{/* Name */}
						<Form.Group controlId="name">
							{/* <Form.Label>Item name</Form.Label> */}
							<Form.Control
								placeholder="Enter item name"
								required
								size="lg"
								type="text"
							/>
							<Form.Text className="text-muted">
								Required
							</Form.Text>
						</Form.Group>

						{/* Size and unit*/}
						<Form.Group controlId="size">
							{/* <Form.Label>Size</Form.Label> */}
							<Row>
								<Col>
									<Form.Control
										disabled={sizeDisabled}
										max="9999"
										min="1"
										placeholder="Enter size"
										required
										size="lg"
										type="number"
									/>
								</Col>
								<Col>
									<Form.Select
										className="text-muted"
										disabled={sizeDisabled}
										onClick={e =>
											e.target.classList.remove(
												'text-muted'
											)
										}
										required
										size="lg"
									>
										<option hidden>Choose unit</option>
										<option value="count">count</option>
										<option value="fl oz">fl oz</option>
										<option value="g">g</option>
										<option value="ml">ml</option>
										<option value="oz">oz</option>
									</Form.Select>
								</Col>
							</Row>

							<Form.Text className="text-muted">
								<Form.Check
									onClick={() =>
										setSizeDisabled(!sizeDisabled)
									}
									label="Not applicable"
									type="checkbox"
								/>
							</Form.Text>
						</Form.Group>

						{/* Expiration */}
						<Form.Group controlId="expiration">
							{/* <Form.Label>Expiration date</Form.Label> */}
							<Form.Control
								disabled={expirationDisabled}
								onFocus={e => (e.target.type = 'date')}
								placeholder="mm/dd/yyyy"
								required
								size="lg"
								type="text"
							/>
							<Form.Text className="text-muted">
								<Form.Check
									label="Not applicable"
									onClick={() =>
										setExpirationDisabled(
											!expirationDisabled
										)
									}
									type="checkbox"
								/>
							</Form.Text>
						</Form.Group>

						{/* Location */}
						<Form.Group controlId="location">
							{/* <Form.Label>Location</Form.Label> */}
							<Form.Select
								className="text-muted"
								disabled={locationDisabled}
								onClick={e =>
									e.target.classList.remove('text-muted')
								}
								required
								size="lg"
							>
								<option hidden>Choose location</option>
								<option value="Basement">Basement</option>
								<option value="Big cupboard">
									Big cupboard
								</option>
								<option value="Small cupboard">
									Small cupboard
								</option>
								<option value="Other">Other</option>
							</Form.Select>
							<Form.Text className="text-muted">
								<Form.Check
									label="Not applicable"
									onClick={() =>
										setLocationDisabled(!locationDisabled)
									}
									type="checkbox"
								/>
							</Form.Text>
						</Form.Group>
					</Stack>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={() => resetForm()} variant="secondary">
						Go back
					</Button>

					<Button type="submit" variant="primary">
						Add item
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
