import React from "react"
import './cardStyle.scss'
import {AiTwotoneCalendar, AiOutlineClockCircle} from "react-icons/ai"
import {IoMdTrash} from "react-icons/io"

const AppointmentCard = ({appointment, changeStatus, deleteAppointment}) => {

  const onClickButton = (id, status) => {
    changeStatus(id, status)
  }

  const onClickDelete = (id) => {
    deleteAppointment(id)
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

      {appointment.status === "none" ?
        <span className="buttons-container">
          <button className="approve-button" onClick={() => onClickButton(appointment.id, "approved")}>Aprovar</button>
          <button className="cancel-button" onClick={() => onClickButton(appointment.id, "canceled")}>Cancelar</button>
        </span> :
        <span className="edit-delete-buttons-container">
          {/* <button className="approve-button" onClick={() => onClickButton(appointment.id, "approved")}>Aprovar</button> */}
          <button className="delete-button" onClick={() => onClickDelete(appointment.id)}><IoMdTrash/></button>
        </span>
      }
    </div>
  )
}

export default AppointmentCard