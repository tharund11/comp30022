import React from 'react'
import {FaTimes, FaRegEdit} from 'react-icons/fa'
import {BiDetail} from 'react-icons/bi'
import {Link} from 'react-router-dom';

const Contact = ({ contact, onDelete}) => {
    return (
        <div className = 'contact'>
            <h3>
                {contact.firstName + " " + contact.lastName} 
                
                {/* More Details button and link to individual page */}
                <div className = 'contact-btn'>
                    <Link to={{pathname: "/individual-contact",state:{
                        firstname: contact.firstName,
                        lastname: contact.lastName,
                        number: contact.phoneNumber,
                        email: contact.email,
                        work: contact.work,
                        eventsid: contact.eventId,
                        roleAtEvent: contact.roleAtEvent,
                        note: contact.note, 
                        id : contact.id
                        }}}>
                    <BiDetail style = {{color: 'green', cursor: 'pointer'}}/>
                    </Link>
                </div>
                {/* Edit Button */}
                <div className = 'contact-btn'>
                    <Link to = {{pathname: 'create-contact', contact : contact}}>
                        <FaRegEdit style = {{color: 'green', cursor: 'pointer'}}></FaRegEdit>
                    </Link>
                </div>
                {/* Delete Button */}
                <div className = 'contact-btn'>
                    <FaTimes style = {{color: 'red', cursor: 'pointer'}} 
                    onClick = {() => onDelete(contact.id)} />
                </div>
            </h3>
            <p>{contact.socialTag === "work" ? 'Work' : 'Social'}</p>
        </div>
    )
}

export default Contact
