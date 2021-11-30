import React, { Component } from "react";
import backgroundVideo from "../resources/backgroundVideo.mp4"
import Header from '../components/IndividualContactPage/Header'
import './indivContactPage.css'

//Information to be shown on individual contact page:
// Firstname and lastname
// phone number
// email
// social tag
// events ID
// role at event
// note

export default class IndividualContact extends Component {
    render() {
// const IndividualContact = ({name}) => {
        const { firstname, lastname, number, email, work, eventsid, roleAtEvent, note } = this.props.location.state

        return (
            <div className = 'indivContactPage'>
                <video autoPlay loop muted
                style = {{
                    position: "absolute",
                    width: "100%",
                    left: "0%",
                    top: "0%",
                    height: "100%",
                    objectFit: "cover",
                    // transform: "translate(-50%,-50%)",
                    zIndex: "-1",
                    opacity: "90%"
                }}
                >
                    <source src = {backgroundVideo} type ="video/mp4"></source>
                </video>
                <Header/>
                <name>
                    <h1>{firstname + " " + lastname}</h1>
                </name>
                <detail><h2>{"Phone Number: " + number}</h2></detail>
                <detail><h2>{"Email: " + email}</h2></detail>
                <detail>
                    {/* &nbsp provides a space */}
                    <h2> Type: &nbsp;</h2> 
                    <h2 style = {{color: work ? 'blue' : 'green'}}>{work ? "Work" : "Personal"}</h2>
                </detail>
                <detail><h2>{"Role at event: " + roleAtEvent}</h2></detail>
                <detail><h2>{"Note: " + note}</h2></detail>
            </div>
        )
    }
}

// export default IndividualContact