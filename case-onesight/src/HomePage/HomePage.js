import React, { useEffect, useState } from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './input.scss'
import { db } from "../index"
import { addDoc, collection, doc, deleteDoc, getDocs, query, setDoc, orderBy } from "firebase/firestore"
import AppointmentCard from "../Components/AppointmentCard/AppointmentCard"
import CreateAppointmentForm from "../Components/CreateAppointmentForm/CreateAppointmentForm"

const HomePage = () => {

  const [value, onChange] = useState(new Date())
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")
  const [appointments, setAppointments] = useState([])

  const getAppointments = async () => {
    const appointmentDB = collection(db, "appointment")

    const q = query(appointmentDB, orderBy("month"), orderBy("date"), orderBy("time"))

    const querySnapshot = await getDocs(q)
    const firebaseData = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id }
    })
    setAppointments(firebaseData)
  }

  const createAppointment = async (body) => {
    try {
      await addDoc(collection(db, "appointment"), body)
      window.location.reload()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const changeStatus = async (id, status) => {
    await setDoc(doc(db, "appointment", id), { status }, { merge: true })
    window.location.reload()
  }

  const deleteAppointment = async (id) => {
    if (window.confirm("Tem certeza de que deseja deletar este compromisso?")) {
      await deleteDoc(doc(db, "appointment", id))
      window.location.reload()
    } else {
      alert("Operação cancelada.")
    }
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

    createAppointment(body)
  }

  return (
    <main>
      <div id="left-container">
        <div id="calendar-container">
          <Calendar onClickDay={() => setShowForm(true)} onChange={onChange} value={value} />
        </div>
        {showForm ?
          <CreateAppointmentForm
            onSubmitForm={onSubmitForm}
            value={value}
            title={title}
            setTitle={setTitle}
            time={time}
            setTime={setTime}
            description={description}
            setDescription={setDescription}
          /> :
          <h2>Selecione um dia no calendário acima para agendar um compromisso.</h2>
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
                  deleteAppointment={deleteAppointment}
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