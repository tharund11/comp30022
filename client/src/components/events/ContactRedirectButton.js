import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';

export default function ContactRedirectButton(){
    return(
        <Link to="/contact-page">
            <Button>
                Contacts Page
            </Button>
        </Link>
    )
}