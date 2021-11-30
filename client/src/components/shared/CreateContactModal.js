import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export default function CreateContactModal(props) {
    var gapi = window.gapi;
    const [date, setDate] = useState();
    const [event, setEvent] = useState({
        summary: '',
        start: { date: '', timeZone: 'Australia/Melbourne' },
        end: { date: '', timeZone: 'Australia/Melbourne' }
    });
    useEffect(() => {
        console.log(event)
    }, [event])

    function submitEvent(){
        gapi.client.calendar.events.insert({
            'calendarId' : props.calendarId,
            'resource' : event
        })
                .then(function(response) {
                    props.onHide();
                });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create A Contact
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <FloatingLabel
                        controlId="title"
                        label="Event Title"
                    >
                        <Form.Control
                            placeholder="Event Title"
                            value={event.title}
                            onChange={e => setEvent(prevState => ({
                                ...prevState,
                                summary: e.target.value
                            }))} />
                    </FloatingLabel>
                </Form.Group>
                <br />
                <Form.Group>
                    <FloatingLabel
                        controlId="date"
                        label="Event Date"
                    >
                        <Form.Control
                            type="date"
                            name='eventDate'
                            value={date}
                            onChange={e => setEvent(prevState => ({
                                ...prevState,
                                start: { ...prevState.start, date: e.target.value },
                                end: { ...prevState.start, date: e.target.value }
                            }))}
                        />
                    </FloatingLabel>
                    <Form.Text className="text-muted">
                        Click on the calendar to choose from a calendar view
                    </Form.Text>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick = {props.onHide} variant="secondary">Close</Button>
                <Button onClick = {submitEvent} variant="primary">Create Event</Button>
            </Modal.Footer>
        </Modal>
    )
}