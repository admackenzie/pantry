// Third party modules
import { Button, Form, Nav, Navbar, Stack } from 'react-bootstrap';

export default function Header() {
	return (
		<Stack className="bg-light px-3 mb-3 sticky-top" gap={1}>
			<Nav className="align-items-center justify-content-between">
				{/* <Nav.Item className="fs-1">Pantry</Nav.Item> */}
				<Navbar.Brand className="fs-1">Pantry</Navbar.Brand>
				<Nav.Item>
					Signed in as <strong>[USER]</strong> |{' '}
					<a href="#logout">Log out</a>
				</Nav.Item>
			</Nav>

			<Nav className="justify-content-between mb-3">
				<Nav.Item>
					<Form>
						<Form.Control
							type="search"
							placeholder="Search"
							// className="me-2"
							// aria-label="Search"
						/>
					</Form>
				</Nav.Item>
				<Nav.Item>
					<Button variant="primary">+ Add new item</Button>
				</Nav.Item>
			</Nav>
		</Stack>
	);
}
