import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import styled from 'styled-components'

const Calendar = styled.div`
  .fc-day-today {
    background: none !important;
    border: none !important;
  } 
`

function AttendanceCalendar({attendanceInfo}:any) {

  return (
    <Calendar>
      <FullCalendar
        plugins={[dayGridPlugin]}
        dayMaxEvents={true}
        events={attendanceInfo}
      />
    </Calendar>
  )
}
export default AttendanceCalendar