import {
	Dropdown,
	ListGroup,
	Offcanvas,
	Stack,
	Row,
	Col,
	Button,
	Container,
} from 'react-bootstrap';

// TODO: settings page, see if sorting is actually working as intended

export default function SettingsMenu(props) {
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
				{/* <ListGroup>
					<ListGroup.Item>TODO</ListGroup.Item>
					<ListGroup.Item>TODO</ListGroup.Item>
				</ListGroup>

				<ListGroup>
					<ListGroup.Item variant="dark">Log out</ListGroup.Item>
				</ListGroup> */}
				<Container>
					<Stack gap={3}>
						<Row>
							<Col>
								<Button variant="outline-primary">
									Sort by name
								</Button>
							</Col>
							<Col>
								<Button variant="outline-primary">
									Sort by recent
								</Button>
							</Col>
						</Row>

						<Row>
							<Button size="lg" variant="outline-primary">
								Logout
							</Button>
						</Row>
					</Stack>
				</Container>
			</Offcanvas.Body>
		</Offcanvas>
	);
}
