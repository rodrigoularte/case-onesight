import React, { useEffect, useState } from "react"
import { db } from "../../index"
import { doc, getDoc, setDoc } from "firebase/firestore"
import {BsX} from "react-icons/bs"
import './editFormStyle.scss'

const EditAppointmentForm = ({ id, getAppointments, setShowEditAppointment }) => {

  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")

  const getAppointment = async (id) => {
    const docSnap = await getDoc(doc(db, "appointment", id))
    const appointment = docSnap.data()
    setTitle(appointment.title)
    setTime(appointment.time)
    setDescription(appointment.description)
  }

  const onSubmitUpdate = async (event) => {
    event.preventDefault()

    const body = {
      title,
      date: `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`,
      month: Number(date.slice(5, 7)),
      time,
      description,
      status: "none"
    }

    await setDoc(doc(db, "appointment", id), body, { merge: true })
    setShowEditAppointment(false)
    getAppointments()
  }

  useEffect(() => {
    getAppointment(id)
  }, [id])

  return (
    <form id="form-container" onSubmit={onSubmitUpdate}>
      <div className="form-top-container">
        <h1>Editar</h1>
        <button onClick={() => setShowEditAppointment(false)}><BsX/></button>
      </div>
      <label>Título</label>
      <input
        className="form-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className="date-time-container">
        <div className="small-container">
          <label>Data</label>
          <input
            className="date-time-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="small-container">
          <label>Horário</label>
          <input
            className="date-time-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
      </div>
      <label>Descrição</label>
      <input
        className="form-input"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="(Opcional)"
      />
      <button id="form-button">Salvar</button>
    </form>
  )
}

export default EditAppointmentForm