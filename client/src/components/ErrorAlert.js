// Third party modules
import { Alert } from 'react-bootstrap';

export default function ErrorAlert(props) {
	const { text, variant } = props;

	return (
		<Alert className="fs-2 text-center" variant={variant}>
			{text}
		</Alert>
	);
}
