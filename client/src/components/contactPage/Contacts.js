import React from 'react'
import Contact from './Contact'


const Contacts = ({filter, contacts, onDelete}) => {

    

    return (
        <div className = 'contactList grid-container'> 
        <h1> {filter} </h1>
            {contacts.filter(contact => contact.work == true).map((contact) => (
              <Contact key = {contact.id} contact = {contact}
              onDelete = {onDelete} />
          ))}
        </div>
    )
}

export default Contacts
