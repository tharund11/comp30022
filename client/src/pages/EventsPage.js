import React, { useState, useEffect } from 'react';
import EventViewDropdown from '../components/events/EventViewDropdown';
import GoogleManageButton from '../components/shared/GoogleManageButton';
import CalendarButtonList from '../components/shared/CalendarButtonList';
import Calendar from '../components/events/Calendar';
import Container from 'react-bootstrap/Container'
import AttendeesModal from '../components/events/AttendeesModal';
import ContactRedirectButton from '../components/events/ContactRedirectButton';
import CreateContactModal from '../components/shared/CreateContactModal';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
const Config = require('../apiGoogleconfig.json');

function EventsPage(){
    var gapi = window.gapi;
    
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [calendarList, setCalendarList] = useState();
    const [calendar, setCalendar] = useState();
    const [events, setEvents] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [eventChosen, setEventChosen] = useState();
    const [createModalShow, setCreateModalShow] = useState(false);
    const [userEvents, setUserEvents] = useState();
    const [dropdownEvents, setDropdownEvents] = useState();

    useEffect(() => {
        handleClientLoad();
        axios({
            method: "post",
            data: {
                id : localStorage.getItem('userId')
            },
            withCredentials: true,
            url: "https://team-ion-backend.herokuapp.com/events"
        }).then((req) => setUserEvents(req.data.events));
    },[]);

    useEffect(() => {
        console.log(userEvents);
    },[userEvents]);

    useEffect(() => {
        if(eventChosen){
            if (eventChosen.length > 0){
                setModalShow(true);
            }
        }
    },[eventChosen]);

    useEffect(() => {
        getEventsFromCalendar(calendar)
    }, [calendar, createModalShow])

    useEffect(() => {
        console.log(events);
        parseEvents(events);
        getDropdownEvents();
    }, [events])

    useEffect(() => {
        getAvailableCalendars();
    }, [isSignedIn])

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
        }, function(error) {
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

    function getDropdownEvents(){
        if(events){
            var contactsArray = [];
            var parsedDropdownEvents = [];
            for(let event of events){
                for(let userEvent of userEvents){
                    if(event.id == userEvent.id){
                        for(let contact of userEvent.contacts){
                            var name = '';
                            name = contact.firstName + ' ' + contact.lastName;
                            contactsArray.push(name);
                        }
                        var dropdownEvent = {key : event.id, value : contactsArray, text : event.summary}
                        parsedDropdownEvents.push(dropdownEvent);
                    }
                }
            }
            setDropdownEvents(parsedDropdownEvents);
        }
    }

    function getAvailableCalendars(){
        if(isSignedIn){
            gapi.client.calendar.calendarList.list()
                .then(function(response) {
                    var calendars = response.result.items;
                    setCalendarList(calendars);
                });
            console.log(calendarList);
        }
        else{
        }
    }

    function getEventsFromCalendar(){
        if(isSignedIn){
            gapi.client.calendar.events.list({calendarId : calendar})
                .then(function(response) {
                    var events = response.result.items;
                    setEvents(events);
                });
            console.log(calendarList);
        }
    }

    function parseEvents(events){
        if(calendarList){
            var parsedEvents = [];
            for(let event of events){
                var parsedEvent = {title : event.summary, id : event.id, start: event.start.dateTime || event.start.date, end: event.end.dateTime || event.end.date, attendees : []};
                for(let userEvent of userEvents){
                    if(userEvent.id == event.id){
                        for(let contact of userEvent.contacts){
                            var attendee = contact.firstName + ' ' + contact.lastName;
                            parsedEvent.attendees.push(attendee);
                        }
                    }
                }
                parsedEvents.push(parsedEvent);
            }
            return parsedEvents;
        }
    }

    function eventClicked(event){
        console.log(event);
        setEventChosen(event.extendedProps.attendees);
    }
    
    return (
        <div className = 'events'>
            <Container>
                <br/>
                <br/>
                <h1>Events</h1>
                <h2>Sign-In To Google Account</h2>
                <GoogleManageButton 
                isSignedIn = {isSignedIn}
                signIn = {() => handleAuthClick()}
                signOut = {() => handleSignoutClick()}/>
                <ContactRedirectButton/>
                <br/>
                <br/>
                <h2>Available Calendars</h2>
                {calendarList && isSignedIn && <CalendarButtonList
                calendars = {calendarList}
                setCalendar = {setCalendar}/>}
                <br/>
                <br/>
                {events && isSignedIn && <Button
                onClick = {()=>setCreateModalShow(true)}
                calendarId = {calendar}>
                    Create Event
                </Button>}
                <br/>
                <br/>
                {events && isSignedIn && <EventViewDropdown
                dropdownEvents={dropdownEvents}
                setChosenDropdownEvent={setEventChosen}
                chosenDropdownEvent={eventChosen}
                />}
                {events && isSignedIn && <Calendar
                events = {parseEvents(events)}
                eventClicked = {eventClicked}
                />}
                {eventChosen && <AttendeesModal
                show = {modalShow}
                onHide = {()=>setModalShow(false)}
                attendees = {eventChosen}/>}
                {createModalShow && <CreateContactModal
                show = {createModalShow}
                calendarId = {calendar}
                onHide = {()=>setCreateModalShow(false)}/>}
            </Container>
        </div>
    );
}
export default EventsPage;