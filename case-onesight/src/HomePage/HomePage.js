import React, { useEffect, useState } from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './input.scss'
import { db } from "../index"
import { addDoc, collection, doc, deleteDoc, getDocs, query, setDoc, orderBy } from "firebase/firestore"
import AppointmentCard from "../Components/AppointmentCard/AppointmentCard"
import CreateAppointmentForm from "../Components/CreateAppointmentForm/CreateAppointmentForm"
import EditAppointmentForm from "../Components/EditAppointmentForm/EditAppointmentForm"

const HomePage = () => {

  const [value, onChange] = useState(new Date())
  const [showCreateAppointment, setShowCreateAppointment] = useState(false)
  const [showEditAppointment, setShowEditAppointment] = useState(false)
  const [id, setId] = useState("")
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
      setTitle("")
      setTime("")
      setDescription("")
      setShowCreateAppointment(false)
      getAppointments()
    } catch (error) {
      console.error("Error adding document: ", error)
    }
  }

  const changeStatus = async (id, status) => {
    await setDoc(doc(db, "appointment", id), { status }, { merge: true })
    getAppointments()
  }

  const deleteAppointment = async (id) => {
    if (window.confirm("Tem certeza de que deseja deletar este compromisso?")) {
      await deleteDoc(doc(db, "appointment", id))
      getAppointments()
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

  const onClickDay = () => {
    setShowCreateAppointment(true)
    setShowEditAppointment(false)
  }

  return (
    <main>
      <div id="left-container">
        <div id="calendar-container">
          <Calendar onClickDay={onClickDay} onChange={onChange} value={value} />
        </div>
        {showEditAppointment &&
          <EditAppointmentForm
            id={id}
            getAppointments={getAppointments}
            setShowEditAppointment={setShowEditAppointment}
          />
        }
        {showCreateAppointment &&
          <CreateAppointmentForm
            onSubmitForm={onSubmitForm}
            value={value}
            title={title}
            setTitle={setTitle}
            time={time}
            setTime={setTime}
            description={description}
            setDescription={setDescription}
          />
        }
        {(showCreateAppointment === false && showEditAppointment === false) &&
          <h2>Selecione um dia no calendário acima para agendar um compromisso.</h2>
        }
      </div>

      <div className="right-container" onClick={() => setShowCreateAppointment(false)}>
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
                  setId={setId}
                  setShowEditAppointment={setShowEditAppointment}
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