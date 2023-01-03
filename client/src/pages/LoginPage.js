// Core modules
import { useNavigate } from 'react-router-dom';
// Local modules
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import PlaceholderCard from '../components/PlaceholderCard';
// Third party modules
import { Col, Container, Row } from 'react-bootstrap';

// TODO: store usernames as lowercase in database??
// TODO: improve error reporting here and in model and controller
// FIXME: add bcrypt here to hash passwords client-side?

export default function LoginPage(props) {
	const navigate = useNavigate();

	// Log in/create new account functionality
	const handleAuth = async (e, route) => {
		e.preventDefault();

		let data = {
			username: e.target['username'].value,
			password: e.target['password'].value,
		};

		if (route === 'signup') {
			data = {
				...data,
				email: e.target['email'].value,
				passwordConfirm: e.target['passwordConfirm'].value,
			};
		}

		// POST request
		try {
			const res = await fetch(`/api/${route}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			const authentication = await res.json();

			if (authentication.status === 'success') {
				// Set app-level JWT for user
				props.handleAuth(authentication.token);

				// Redirect to index page
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{/* Login screen */}
			<Container>
				<LoginModal handleAuth={handleAuth} />
			</Container>

			{/* Blurred background with placeholder item cards */}
			<Container style={{ filter: 'blur(8px)' }}>
				<Header />

				<Row className="g-3 " md={2} xs={1}>
					{[...Array(8).keys()].map(n => {
						return (
							<Col key={n}>
								<PlaceholderCard />
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
}
