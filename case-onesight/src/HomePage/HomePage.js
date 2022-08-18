import React, { useEffect, useState } from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './input.scss'
import { db } from "../index"
import { addDoc, collection, doc, getDocs, query, setDoc, orderBy } from "firebase/firestore"
import AppointmentCard from "../Components/AppointmentCard/AppointmentCard"

const HomePage = () => {

  const [value, onChange] = useState(new Date())
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")
  const [appointments, setAppointments] = useState([])

  console.log(appointments)


  const getAppointments = async () => {
    const appointmentDB = collection(db, "appointment")

    const q = query(appointmentDB, orderBy("month"), orderBy("date"), orderBy("time"))

    const querySnapshot = await getDocs(q)
    const firebaseData = querySnapshot.docs.map((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`)
      return { ...doc.data(), id: doc.id }
    })
    setAppointments(firebaseData)
  }

  const createAppointment = async (body) => {
    try {
      const docRef = await addDoc(collection(db, "appointment"), body)

      console.log("Document written with ID: ", docRef.id)
      window.location.reload()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const changeStatus = async (id, status) => {
    console.log(id, status)
    await setDoc(doc(db, "appointment", id), { status }, { merge: true })
    window.location.reload()
  }

  useEffect(() => {
    getAppointments()
  }, [])

  const onSubmitForm = (event) => {
    event.preventDefault()

    const body = {
      title,
      date: value.toLocaleDateString(),
      month: value.getMonth() + 1,
      time,
      description,
      status: "none"
    }

    console.log(body)

    createAppointment(body)
  }

  return (
    <main>

      <div id="left-container">
        <div id="calendar-container">
          <Calendar onClickDay={() => setShowForm(true)} onChange={onChange} value={value} />
        </div>
        {showForm ?
          <form id="form-container" onSubmit={onSubmitForm}>
            <h1>{value.toLocaleDateString()}</h1>
            <label>Título</label>
            <input
              className="form-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>Horário</label>
            <input
              className="form-time-input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <label>Descrição</label>
            <input
              className="form-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="(Opcional)"
            />
            <button id="form-button">Salvar</button>
          </form> : <h2>Selecione um dia no calendário acima para agendar um compromisso.</h2>
        }
      </div>

      <div className="right-container" onClick={() => setShowForm(false)}>
        <h2>Compromissos</h2>
        <nav className="appointments-container">
          {appointments.length > 0 &&
            appointments.map((appointment) => {
              return (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  changeStatus={changeStatus}
                />
              )
            })
          }
        </nav>
      </div>


    </main>
  )
}

export default HomePage