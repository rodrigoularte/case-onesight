import React, { useState } from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './input.scss'

const HomePage = () => {

  const [value, onChange] = useState(new Date())
  const [showForm, setShowForm] = useState(false)
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

  return (
    <main>

      <div id="left-container">
        <div>
          <Calendar onClickDay={() => setShowForm(true)} onChange={onChange} value={value} />
        </div>
        {showForm ?
          <form id="form-container" onSubmit={onSubmitForm}>
            <span>
              <p>{value.toLocaleDateString()}</p>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </span>
            <label>Event/Appointment</label>
            <input
              className="form-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <input
              className="form-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button id="form-button">Save</button>
          </form> : <p>Choose a day</p>
        }
      </div>

      <div onClick={() => setShowForm(false)}>
        {appointments.length > 0 &&
          appointments.map((appointment) => {
            return (
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

    </main>
  )
}

export default HomePage