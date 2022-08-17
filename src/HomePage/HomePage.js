import React, { useState } from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const  HomePage = () => {

  const [value, onChange] = useState(new Date())
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")
  const [appointments, setAppointments] = useState([])

  console.log(appointments)

  const onSubmitForm = (event) => {
    event.preventDefault()

    const body = {
      title,
      date: value.toLocaleDateString(),
      time,
      description
    }

    setAppointments([...appointments, body])
  }

  return(
    <div>

    <div>
      <div>
        <Calendar onChange={onChange} value={value} />
      </div>
      <form onSubmit={onSubmitForm}>
        <p>{value.toLocaleDateString()}</p>
        <input placeholder="Event/Appointment title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)}/>
        <input placeholder="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <button>Save</button>
      </form>
    </div>

    <div>
      {appointments.length > 0 &&
        appointments.map((appointment) => {
          return(
            <div>
              <p>{appointment.title}</p>
              <p>{appointment.date}</p>
              <p>{appointment.time}</p>
              <p>{appointment.description}</p>
            </div>
          )
        })
      }
    </div>

    </div>
  )
}

export default HomePage