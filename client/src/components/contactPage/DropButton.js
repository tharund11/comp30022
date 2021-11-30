import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { useState } from 'react'

const DropButton = ({props}) => {
    
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
        <div className = 'dropbox'>
        <DropdownButton id="dropdown-basic-button" title={work ? 'Work' : 'Personal'}>
        <Dropdown.Item href="#Work-1" onClick = {setWorkTrue}>Work</Dropdown.Item>
        <Dropdown.Item href="#/Personal-2" onClick = {setWorkFalse}>Personal</Dropdown.Item>
        </DropdownButton>
        </div>
    )
}

export default DropButton
