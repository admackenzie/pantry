// Third party modules
import { Button, Modal } from 'react-bootstrap';

export default function ConfirmModal(props) {
	const {
		cancelText,
		confirmText,
		handler,
		handlerData,
		modalState,
		setModalState,
		titleText,
	} = props;

	return (
		<Modal centered onHide={() => setModalState(false)} show={modalState}>
			<Modal.Header>
				<Modal.Title className="mx-auto">{titleText}</Modal.Title>
			</Modal.Header>

			<Modal.Footer>
				<Button
					onClick={() => setModalState(false)}
					variant="secondary"
				>
					{cancelText}
				</Button>
				<Button
					onClick={() =>
						handlerData ? handler(handlerData) : handler()
					}
					variant="primary"
				>
					{confirmText}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
