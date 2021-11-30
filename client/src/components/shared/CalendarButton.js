import Button from 'react-bootstrap/Button'
export default function CalendarButton({calendar, setCalendar}){
    return(
        <Button onClick = {() => setCalendar(calendar.id)}>{calendar.summary}</Button>
    );
}