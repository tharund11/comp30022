import React from 'react'
import Button from './Button'
import '../../pages/contactPage.css'
import {Link} from 'react-router-dom';

const Header = ({ onAdd, showAdd }) => {

    return (
        <div className = "App contactPage">
            <div className = 'header'>
                <div className = 'name'> ION Customer Relationship Managment</div>
                <Link to= "/contact-page">
                    <Button color = 'red' text = 'return'/>
                </Link>
            </div>
        </div>
    )
}

export default Header