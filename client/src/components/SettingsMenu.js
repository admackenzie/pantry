// Core modules
import { useState } from 'react';
// Local modules
import ConfirmModal from './ConfirmModal';
import ManagePantryModal from './ManagePantryModal';
// Third party modules
import { Button, Col, Container, Offcanvas, Row } from 'react-bootstrap';

export default function SettingsMenu(props) {
	// FIXME: This is a hacky way to have toggle button states outside a toggle button group. It only works with a maximum of two buttons (disabled={toggle} and disabled={!toggle})
	const [buttonToggle, setButtonToggle] = useState(true);

	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [showManageModal, setShowManageModal] = useState(false);

	// Sort data by most recently added or by name
	const handleSort = sortParam => {
		setButtonToggle(!buttonToggle);

		props.setSortState(sortParam);
		props.fetchData(`?name=${props.searchInput}&sort=${sortParam}`);
	};

	return (
		<Offcanvas
			onHide={props.setOffcanvasState}
			placement="bottom"
			show={props.offcanvasState}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Settings</Offcanvas.Title>
			</Offcanvas.Header>

			<Offcanvas.Body>
				<Container className="d-grid gap-3">
					<Row>
						<Col>
							<Button
								className="w-100"
								disabled={buttonToggle}
								onClick={() => handleSort('-addedOn')}
								size="lg"
								value="1"
								variant={
									buttonToggle ? 'primary' : 'outline-primary'
								}
							>
								Sort by recent
							</Button>
						</Col>

						<Col>
							<Button
								className="w-100"
								disabled={!buttonToggle}
								onClick={() => handleSort('name')}
								size="lg"
								variant={
									!buttonToggle
										? 'primary'
										: 'outline-primary'
								}
							>
								Sort by name
							</Button>
						</Col>
					</Row>

					<Row>
						<Col>
							<Button
								className="w-100"
								onClick={() => setShowManageModal(true)}
								size="lg"
								variant="outline-primary"
							>
								Manage pantry
							</Button>
						</Col>

						<Col>
							<Button
								className="w-100"
								onClick={() => setShowLogoutModal(true)}
								size="lg"
								variant="secondary"
							>
								Logout
							</Button>
						</Col>
					</Row>
				</Container>
			</Offcanvas.Body>

			{/* Manage pantry screen */}
			<ManagePantryModal
				modalState={showManageModal}
				setModalState={setShowManageModal}
			/>

			{/* TODO: implement logout */}
			{/* Logout confirmation */}
			<ConfirmModal
				cancelText="Go back"
				confirmText="Log out"
				// handler={'[LOGOUT]'}
				// handlerData={'[DATA]'}
				modalState={showLogoutModal}
				setModalState={setShowLogoutModal}
				titleText="Are you sure you want log out?"
			/>
		</Offcanvas>
	);
}
