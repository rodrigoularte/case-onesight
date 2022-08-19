import React from "react"
import './formStyle.scss'

const CreateAppointmentForm = (props) => {

  return (
    <form id="form-container" onSubmit={props.onSubmitForm}>
      <h1>{props.value.toLocaleDateString()}</h1>
      <label>Título</label>
      <input
        className="form-input"
        type="text"
        value={props.title}
        onChange={(e) => props.setTitle(e.target.value)}
        required
      />
      <label>Horário</label>
      <input
        className="form-time-input"
        type="time"
        value={props.time}
        onChange={(e) => props.setTime(e.target.value)}
        required
      />
      <label>Descrição</label>
      <input
        className="form-input"
        type="text"
        value={props.description}
        onChange={(e) => props.setDescription(e.target.value)}
        placeholder="(Opcional)"
      />
      <button id="form-button">Salvar</button>
    </form>
  )
}

export default CreateAppointmentForm