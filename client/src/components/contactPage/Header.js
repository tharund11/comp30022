import React from 'react'
import Button from './Button'
import {Link} from 'react-router-dom';
import '../../pages/contactPage.css'

const Header = () => {

    return (
        <div className = 'header'>
            <div className = 'name'> ION Customer Relationship Managment</div>
            <Link to = 'create-contact'>
                <Button color = 'green' text = 'Add Contact'/>
            </Link>
        </div>
    )
}


export default Header
