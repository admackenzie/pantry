// Core modules
import { useState } from 'react';
// Third party modules
import { Button, Form, Modal, Stack } from 'react-bootstrap';

export default function LoginModal(props) {
	// Display state for login and signup options
	const [existingUser, setExistingUser] = useState(true);

	const { handleAuth } = props;

	return (
		<Modal centered show={true}>
			<Modal.Header>
				<Modal.Title>
					{existingUser ? 'Login' : 'Create new account'}
				</Modal.Title>
			</Modal.Header>
			<Form
				onSubmit={e => handleAuth(e, existingUser ? 'login' : 'signup')}
			>
				<Modal.Body>
					<Stack gap={3}>
						<Form.Control
							name="username"
							placeholder="Enter username"
							required
							size="lg"
							type="text"
						/>

						<Form.Control
							className={`${existingUser && 'd-none'}`}
							disabled={existingUser}
							name="email"
							placeholder="Enter email"
							required
							size="lg"
							type="email"
						/>

						<Form.Control
							name="password"
							placeholder="Enter password"
							required
							size="lg"
							type="password"
						/>

						<Form.Control
							className={`${existingUser && 'd-none'}`}
							disabled={existingUser}
							name="passwordConfirm"
							placeholder="Confirm password"
							required
							size="lg"
							type="password"
						/>
					</Stack>
				</Modal.Body>

				<Modal.Footer>
					<Button
						onClick={() => setExistingUser(!existingUser)}
						variant="secondary"
					>
						{existingUser ? 'Sign up' : 'Go back'}
					</Button>

					<Button type="submit" variant="primary">
						{existingUser ? 'Login' : 'Sign up'}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
