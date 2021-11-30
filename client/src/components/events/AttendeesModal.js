import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
export default function AttendeesModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Attendees From Your Contacts
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.attendees.map((attendee,i) => <li key={i}>{attendee}</li>)}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}