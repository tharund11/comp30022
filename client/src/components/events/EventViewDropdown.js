import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/components/dropdown.min.css'
import 'semantic-ui-css/components/transition.min.css'
import 'semantic-ui-css/components/label.min.css'

export default function EventViewDropdown({ dropdownEvents, setChosenDropdownEvent, chosenDropdownEvent }) {
    const getEvent = (event, {value, text}) => {
        setChosenDropdownEvent(value);
        console.log(event.target.textContent);
    }
    return (
        <div>
            <link rel="stylesheet" type="text/css" href='semantic-ui-css/semantic.min.css' />
            <Dropdown
                placeholder='Select Event'
                fluid
                search
                selection
                options={dropdownEvents}
                value = {chosenDropdownEvent}
                onChange = {getEvent}
            />
        </div>
    )
}