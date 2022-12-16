// Core modules
import { useState } from 'react';
// Local modules
import AddItemModal from './AddItemModal';
import SettingsMenu from './SettingsMenu';
// Third party modules
import { Button, Form, Nav, Navbar, Stack } from 'react-bootstrap';

export default function Header(props) {
	const [showModal, setShowModal] = useState(false);
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	const [searchInput, setSearchInput] = useState('');
	const handleSearch = e => {
		e.preventDefault();

		// Search bar display
		setSearchInput(e.target.value);

		// Fetch search bar results
		props.fetchData(`?name=${e.target.value}`);
	};

	return (
		<Stack className="bg-light px-3 mb-3 sticky-top" gap={1}>
			<Nav className="align-items-center justify-content-between">
				<Navbar.Brand
					className="fs-1"
					// Quick search reset
					onClick={() => {
						setSearchInput('');
						props.fetchData();
					}}
				>
					Pantry
				</Navbar.Brand>

				<div className="align-items-center d-inline-flex">
					<Nav.Item>
						Signed in as <strong>[USER]</strong>
					</Nav.Item>
					<Nav.Item className="ms-3">
						<Button
							className="bg-transparent border-0 pe-0"
							onClick={() => setShowOffcanvas(!showOffcanvas)}
						>
							⚙️
						</Button>

						<SettingsMenu
							offcanvasState={showOffcanvas}
							setOffcanvasState={setShowOffcanvas}
						/>
					</Nav.Item>
				</div>
			</Nav>

			<Nav className="justify-content-between mb-3">
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
				<Nav.Item>
					<Button
						onClick={() => setShowModal(true)}
						variant="primary"
					>
						+ Add new item
					</Button>
				</Nav.Item>
			</Nav>

			{/* Add item functionality*/}
			<AddItemModal
				{...props}
				modalState={showModal}
				setModalState={setShowModal}
			/>
		</Stack>
	);
}
