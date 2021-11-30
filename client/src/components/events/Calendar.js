import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar({ events, eventClicked }){

    return(
        <div>
            <h2>Calendar</h2>
            <FullCalendar
            plugins = {[dayGridPlugin]}
            initialView = 'dayGridMonth'
            events = {events}
            eventClick = {(info)=>eventClicked(info.event)}
            />
        </div>
    )
}