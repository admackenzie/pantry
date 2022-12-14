// Core modules
import { useState } from 'react';
// Local modules
import AddItemModal from './AddItemModal';
import SettingsMenu from './SettingsMenu';
// Third party modules
import { Button, Form, Nav, Navbar, Stack } from 'react-bootstrap';

export default function Header(props) {
	const { fetchData, userID, username } = props;

	// Toggle hide/show for AddItemModal and SettingsMenu
	const [showModal, setShowModal] = useState(false);
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	// Store sort preference if it's been changed from the default
	const [sortState, setSortState] = useState('-addedOn');

	// Search bar functionality
	const [searchInput, setSearchInput] = useState('');
	const handleSearch = e => {
		e.preventDefault();

		// Search bar display
		setSearchInput(e.target.value);

		// Fetch search bar results
		fetchData(`/users/${userID}?name=${e.target.value}&sort=${sortState}`);
	};

	// const handleLocations = async () => {
	// 	const res = await fetch(`/api/locations/${userID}`);
	// 	const {
	// 		data: { locations },
	// 	} = await res.json();

	// 	return locations;
	// };

	return (
		<Stack className="bg-light px-3 mb-3 sticky-top" gap={1}>
			<Nav className="align-items-center justify-content-between">
				<Navbar.Brand
					className="fs-1"
					// Quick search reset
					onClick={() => {
						setSearchInput('');
						fetchData(`/users/${userID}`);
					}}
				>
					<span>Pantry</span>
					<sup className="ms-2 fs-6">pre-release</sup>
				</Navbar.Brand>

				<div className="align-items-center d-inline-flex">
					<Nav.Item>
						Signed in as <strong>{username}</strong>
					</Nav.Item>

					{/* Settings menu */}
					<Nav.Item className="ms-3">
						<Button
							className="bg-transparent border-0 pe-0"
							onClick={() => setShowOffcanvas(!showOffcanvas)}
						>
							⚙️
						</Button>

						<SettingsMenu
							{...props}
							offcanvasState={showOffcanvas}
							searchInput={searchInput}
							setOffcanvasState={setShowOffcanvas}
							setSortState={setSortState}
						/>
					</Nav.Item>
				</div>
			</Nav>

			<Nav className="justify-content-between mb-3">
				{/* Search bar */}
				<Nav.Item>
					<Form>
						<Form.Control
							onChange={handleSearch}
							placeholder="Search"
							type="search"
							value={searchInput}
						/>
					</Form>
				</Nav.Item>

				{/* Add item button */}
				<Nav.Item>
					<Button
						onClick={() => setShowModal(true)}
						variant="primary"
					>
						Add new item
					</Button>
				</Nav.Item>
			</Nav>

			{/* Add item screen*/}
			<AddItemModal
				{...props}
				modalState={showModal}
				setModalState={setShowModal}
			/>
		</Stack>
	);
}
