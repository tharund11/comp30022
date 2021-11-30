import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'


export default function CreateContactForm({ contact, createdContact, setCreatedContact, radioValue, setRadioValue }){

    useEffect(() => {
        if (contact === undefined) {
        }
        else {
            if (contact.work === true) {
                setRadioValue(1);
            }
            else if (contact.work === false) {
                setRadioValue(2);
            }
            setCreatedContact(contact)
        }
    }, [contact])

    return (
        <Form>
            <Form.Label><h5>Personal Details</h5></Form.Label>
            <Form.Group>
                <Row>
                    <Col>
                        <FloatingLabel
                            controlId="firstName"
                            label="First Name"
                        >
                            <Form.Control
                                defaultValue={contact && contact.firstName}
                                placeholder="First name"
                                value={createdContact.firstName}
                                onChange={e => setCreatedContact(prevState => ({
                                    ...prevState,
                                    firstName: e.target.value
                                }))} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="lastName"
                            label="Last Name"
                        >
                            <Form.Control
                                defaultValue={contact && contact.lastName}
                                placeholder="Last name"
                                value={createdContact.lastName}
                                onChange={e => setCreatedContact(prevState => ({
                                    ...prevState,
                                    lastName: e.target.value
                                }))} />
                        </FloatingLabel>
                    </Col>
                </Row>
            </Form.Group>
            <br />
            <Form.Group>
                <FloatingLabel
                    controlId="email"
                    label="Email address"
                >
                    <Form.Control
                        type="email"
                        defaultValue={contact && contact.email}
                        placeholder="Enter email"
                        value={createdContact.email}
                        onChange={e => setCreatedContact(prevState => ({
                            ...prevState,
                            email: e.target.value
                        }))} />
                </FloatingLabel>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <br />
            <Form.Group>
                <FloatingLabel
                    controlId="phone"
                    label="Phone Number"
                >
                    <Form.Control
                        type="phone"
                        defaultValue={contact && contact.phone}
                        placeholder="Enter Phone Number"
                        value={createdContact.phoneNumber}
                        onChange={e => setCreatedContact(prevState => ({
                            ...prevState,
                            phoneNumber: e.target.value
                        }))} />
                </FloatingLabel>
                <Form.Text className="text-muted">
                    We'll never share your phone number with anyone else.
                </Form.Text>
            </Form.Group>
            <br />
            <Form.Label><h5>Social Tag</h5></Form.Label>
            <Form.Group>
                <ButtonGroup>
                    <ToggleButton
                        key={1}
                        id="work"
                        type="radio"
                        variant='outline-primary'
                        name="radio1"
                        value={1}
                        checked={radioValue == 1}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        Work
                    </ToggleButton>
                    <ToggleButton
                        key={2}
                        id="social"
                        type="radio"
                        variant='outline-primary'
                        name="radio2"
                        value={2}
                        checked={radioValue == 2}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        Social
                    </ToggleButton>
                </ButtonGroup>
            </Form.Group>
            <br />
            <Form.Group>
                <FloatingLabel controlId="notes" label="Additional Notes">
                    <Form.Control
                        defaultValue={contact && contact.note}
                        as="textarea"
                        placeholder="Additional Notes"
                        style={{ height: '100px' }}
                        value={createdContact.note}
                        onChange={e => setCreatedContact(prevState => ({
                            ...prevState,
                            note: e.target.value
                        }))}
                    />
                </FloatingLabel>
            </Form.Group>
            <br/>
        </Form>
    )
}