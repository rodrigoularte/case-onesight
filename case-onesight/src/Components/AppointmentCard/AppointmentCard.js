import React from "react"
import './cardStyle.scss'
import {AiTwotoneCalendar, AiOutlineClockCircle} from "react-icons/ai"

const AppointmentCard = ({appointment, changeStatus}) => {

  const onClickButton = (id, status) => {
    changeStatus(id, status)
  }

  let style
  switch (appointment.status) {
    case "approved":
      style = "card-container-green"
      break
    case "canceled":
      style = "card-container-red"
      break
    default:
      style = "card-container"
  }

  return (
    <div key={appointment.id} id={style}>
      <div className="info-container">
        <h2 className="title">{appointment.title}</h2>
        <span className="date-time-span">
          <h3 className="date"><AiTwotoneCalendar/>{appointment.date}</h3>
          <h3><AiOutlineClockCircle/>{appointment.time}</h3>
        </span>
        <p>{appointment.description}</p>
      </div>

      {appointment.status === "none" &&
        <span className="buttons-container">
          <button className="approve-button" onClick={() => onClickButton(appointment.id, "approved")}>Aprovar</button>
          <button className="cancel-button" onClick={() => onClickButton(appointment.id, "canceled")}>Cancelar</button>
        </span>
      }
    </div>
  )
}

export default AppointmentCard