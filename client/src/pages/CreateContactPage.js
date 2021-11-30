import Container from 'react-bootstrap/Container'
import CreateContactForm from '../components/CreateContactPage/CreateContactForm'
import React, { useState, useEffect } from 'react';
import GoogleManageButton from '../components/shared/GoogleManageButton';
import CalendarButtonList from '../components/shared/CalendarButtonList';
import Button from 'react-bootstrap/Button'
import EventDropdown from '../components/CreateContactPage/EventDropdown';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateContactModal from '../components/shared/CreateContactModal';
import backgroundVideo from "../resources/backgroundVideo.mp4";
const Config = require('../apiGoogleconfig.json');


export default function CreateContactPage(props) {
    var gapi = window.gapi;

    const [editedContact, setEditedContact] = useState();
    const [dropdownEvents, setDropdownEvents] = useState();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [calendarList, setCalendarList] = useState();
    const [calendar, setCalendar] = useState();
    const [events, setEvents] = useState();
    const [radioValue, setRadioValue] = useState(1);
    const [chosenEvents, setChosenEvents] = useState([]);
    const [createModalShow, setCreateModalShow] = useState(false);
    const [createdContact, setCreatedContact] = useState({
        _id : '',
        note: '',
        roleAtEvent: '',
        socialTag: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        eventId: []
    });

    useEffect(() => {
        if(props){
            if(props.location){
                if (props.location.contact) {
                    setEditedContact(props.location.contact)
                    console.log(props.location.contact);
                }
            }
        }
        handleClientLoad();
    }, []);


    useEffect(() => {
        getAvailableCalendars();
    }, [isSignedIn])

    useEffect(() => {
        setChosenEvents([])
        getEventsFromCalendar(calendar)
    }, [calendar, createModalShow])

    useEffect(() => {
        if (events) {
            parseDropdownEvents(events);
        }
        console.log(events)
    }, [events])

    useEffect(() => {
        setCreatedContact(prevState => ({
            ...prevState,
            eventId: chosenEvents
        }));
    }, [chosenEvents])

    useEffect(() => {
        if (radioValue == 1) {
            setCreatedContact(prevState => ({
                ...prevState,
                socialTag: 'work'
            }));
        }
        else {
            setCreatedContact(prevState => ({
                ...prevState,
                socialTag: 'social'
            }));
        }
    }, [radioValue])

    /**
      *  On load, called to load the auth2 library and API client library.
   */
    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
    */
    function initClient() {
        gapi.client.init({
            apiKey: Config.API_KEY,
            clientId: Config.CLIENT_ID,
            discoveryDocs: Config.DISCOVERY_DOCS,
            scope: Config.SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
            updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }, function (error) {
            console.log(JSON.stringify(error, null, 2));
        });
    }

    /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
    function updateSignInStatus(signInStatus) {
        setIsSignedIn(signInStatus);
    }

    /**
       *  Sign in the user upon button click.
    */
    function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

    /**
       *  Sign out the user upon button click.
    */
    function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }

    function getAvailableCalendars() {
        if (isSignedIn) {
            gapi.client.calendar.calendarList.list()
                .then(function (response) {
                    var calendars = response.result.items;
                    setCalendarList(calendars);
                });
            console.log(calendarList);
        }
        else {
        }
    }

    function getEventsFromCalendar() {
        if (isSignedIn) {
            gapi.client.calendar.events.list({ calendarId: calendar })
                .then(function (response) {
                    var events = response.result.items;
                    setEvents(events);
                });
        }
    }

    function parseDropdownEvents(events) {
        var parsedEvents = []
        for (let i = 0; i < events.length; i++) {
            var event = events[i];
            var parsedEvent = { key: event.id, value: event.id, text: event.summary }
            parsedEvents.push(parsedEvent);
        }
        setDropdownEvents(parsedEvents);
    }

    function submitContact() {
        if(!editedContact){
            setCreatedContact(prevState => ({
                ...prevState,
                id : undefined
            }));
            axios({
                method: "post",
                data: {
                    id : localStorage.getItem("userId"),
                    contact : createdContact
                },
                withCredentials: true,
                url: "https://team-ion-backend.herokuapp.com/contacts/create"
            }).then((req) => console.log(req.data));
        }
        else{
            console.log('edit')
            setCreatedContact(prevState => ({
                ...prevState,
                id : editedContact.id
            }));
            console.log(createdContact);
            axios({
                method: "post",
                data: {
                    id : localStorage.getItem("userId"),
                    contact : createdContact
                },
                withCredentials: true,
                url: "https://team-ion-backend.herokuapp.com/contacts/update"
            }).then((req) => console.log(req.data));
        }   
    }

    return (
        <div
            style={{ backgroundColor: '#85E3FF' }}>
            <br />
            <br />
            <Container>
                <Link to='contact-page'>
                    <Button variant='success'>
                        Back to Contacts
                    </Button>
                </Link>
                <h1>
                    {(editedContact) ? "Edit Contact" : "Create Contact"}
                </h1>
                <CreateContactForm
                    contact={editedContact}
                    createdContact={createdContact}
                    setCreatedContact={setCreatedContact}
                    radioValue={radioValue}
                    setRadioValue={setRadioValue}
                />
                <br />
                <h1>Event Information</h1>
                <br />
                <h5>Sign-In to Google Account</h5>
                <GoogleManageButton
                    isSignedIn={isSignedIn}
                    signIn={() => handleAuthClick()}
                    signOut={() => handleSignoutClick()} />
                <br />
                <br />
                {calendarList && isSignedIn && <h5>Available Calendars</h5>}
                {calendarList && isSignedIn && <CalendarButtonList
                    calendars={calendarList}
                    setCalendar={setCalendar} />}
                <br />
                {events && isSignedIn && <Button
                onClick = {()=>setCreateModalShow(true)}
                calendarId = {calendar}>
                    Create Event
                </Button>}
                <br/>
                <br/>
                {dropdownEvents && isSignedIn && <EventDropdown
                    dropdownEvents={dropdownEvents}
                    chosenEvents={chosenEvents}
                    setChosenEvents={setChosenEvents}
                />}
                <br />
                <Button onClick={submitContact} size='lg'>
                    {(editedContact) ? "Edit Contact" : "Create Contact"}
                </Button>
                {createModalShow && <CreateContactModal
                    show={createModalShow}
                    calendarId={calendar}
                    onHide={() => setCreateModalShow(false)} />}
            </Container>
        </div>
    )
}