import React, { useState } from "react"
import './cardStyle.scss'

const AppointmentCard = ({appointment}) => {

  const [style, setStyle] = useState("card-container")

  return (
    <div key={appointment.id} id={style} select={true}>
      <div className="info-container">
        <h2 className="title">{appointment.title}</h2>
        <span className="date-time-span">
          <h3 className="date">{appointment.date}</h3>
          <h3>{appointment.time}</h3>
        </span>
        <p>{appointment.description}</p>
      </div>
      <span className="buttons-container">
        <button className="approve-button" onClick={() => setStyle("card-container-green")}>Approve</button>
        <button className="cancel-button" onClick={() => setStyle("card-container-red")}>Cancel</button>
      </span>
    </div>
  )
}

export default AppointmentCard