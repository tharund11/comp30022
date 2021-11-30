import CalendarButton from './CalendarButton'

export default function CalenderButtonList({calendars, setCalendar}){
    return(
        <div>
            {calendars.map((calendar, index) =>(
                <CalendarButton calendar = {calendar} setCalendar = {setCalendar} key = {index}/>
            ))}
        </div>
    );
}