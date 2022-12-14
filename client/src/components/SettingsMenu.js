// Core modules
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Local modules
import ConfirmModal from './ConfirmModal';
import ManagePantryModal from './ManagePantryModal';
// Third party modules
import { Button, Col, Container, Offcanvas, Row } from 'react-bootstrap';

export default function SettingsMenu(props) {
	const {
		fetchData,
		offcanvasState,
		searchInput,
		setOffcanvasState,
		setSortState,
		userID,
	} = props;

	const navigate = useNavigate();

	// FIXME: This is a hacky way to have toggle button states outside a toggle button group. It only works with a maximum of two buttons (disabled={toggle} and disabled={!toggle})
	const [buttonToggle, setButtonToggle] = useState(true);

	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [showManageModal, setShowManageModal] = useState(false);

	// Sort data by most recently added or by name
	const handleSort = sortParam => {
		setButtonToggle(!buttonToggle);

		setSortState(sortParam);

		fetchData(`/users/${userID}?name=${searchInput}&sort=${sortParam}`);
	};

	// Clear stored JWT
	const logout = () => {
		localStorage.clear();
		navigate('/login');
	};

	return (
		<Offcanvas
			onHide={setOffcanvasState}
			placement="bottom"
			show={offcanvasState}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Settings</Offcanvas.Title>
			</Offcanvas.Header>

			<Offcanvas.Body>
				<Container className="d-grid gap-3">
					{/* Sort functionality */}
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
						{/* Manage pantry */}
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

						{/* Logout */}
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
				{...props}
				modalState={showManageModal}
				setModalState={setShowManageModal}
			/>

			{/* Logout confirmation */}
			<ConfirmModal
				cancelText="Go back"
				confirmText="Log out"
				handler={logout}
				modalState={showLogoutModal}
				setModalState={setShowLogoutModal}
				titleText="Are you sure you want log out?"
			/>
		</Offcanvas>
	);
}
