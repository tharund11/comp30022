import React from 'react'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { useState } from 'react'

const UtilityBar = () => {

    const[work, setWork] = useState (true)

    const setWorkTrue = () => {
        setWork(true);
        console.log("TRUE");
    }
    const setWorkFalse = () => {
        setWork(false);
        console.log("FALSE");
    }

    return (
        <div>
            <div className = 'contactTag'> 
                <div className = 'tagName'>Contacts </div>
            </div>
            <div className = 'searchBox'>
                <input type = 'text' placeholder = 'Type something...'></input>
                <div className = 'dropbox'>
                    <DropdownButton id="dropdown-basic-button" title={work ? 'Work' : 'Personal'}>
                    <Dropdown.Item href="#Work-1" onClick = {setWorkTrue}>Work</Dropdown.Item>
                    <Dropdown.Item href="#/Personal-2" onClick = {setWorkFalse}>Personal</Dropdown.Item>
                    </DropdownButton>
                </div>
                <Button variant = 'info'> Search </Button>
                <Button className = 'btn-event' variant = 'warning'> Change to events</Button>

                
            </div>

        </div>
        
    )
}


export default UtilityBar
