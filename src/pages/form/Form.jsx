import React, {useState, useRef} from 'react'
import { getDatabase, ref, child, push, update } from "firebase/database";
import app from '../../FirebaseConfig';
import './Form.scss'

function Form({setPage, nextPage}) {

  const db = getDatabase(app);
  const [loading, setLoading] = useState(false);

  // Función para manejar el evento de cierre del teclado
    const handleKeyboardClose = () => {
      window.scrollTo(0, 0);
  };

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    profesion: '',
    especialidad: '',
  })

  const [error, setError] = useState({
    nombre: '',
    email: '',
    telefono: '',
    profesion: '',
    especialidad: '',
  })

  function submit(){
    if(!handleErrors()){
      setLoading(true);
      try{
        const newPostKey = push(child(ref(db), '/')).key;
        const updates = {};
        updates[newPostKey] = form;

        update(ref(db), updates).then(() => {
          const voidForm = {
            nombre: '',
            email: '',
            telefono: '',
            profesion: '',
            especialidad: '',
          }
          setForm(voidForm);
          setPage(nextPage);

        }).catch((error) => {
          alert('Error al enviar el formulario, intenta nuevamente')
        });
      }
      catch(e){
        alert('Error al enviar el formulario, intenta nuevamente')
      }
      setLoading(false);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleErrors = () => {
    let errors = {
      nombre: '',
      email: '',
      telefono: '',
      profesion: '',
      especialidad: '',
    }
    let hasErrors = false

    if(form.nombre.trim() === ''){
      errors.nombre = 'Este campo es requerido'
      hasErrors = true
    }

    if(form.email.trim() === ''){
      errors.email = 'Este campo es requerido'
      hasErrors = true
    }else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))){
      errors.email = 'El email no es válido'
      hasErrors = true
    }

    if(form.telefono.trim() === ''){
      errors.telefono = 'Este campo es requerido'
      hasErrors = true
    }

    if(form.profesion.trim() === ''){
      errors.profesion = 'Este campo es requerido'
      hasErrors = true
    }

    if(form.especialidad.trim() === ''){
      errors.especialidad = 'Este campo es requerido'
      hasErrors = true
    }

    setError(errors)
    return hasErrors
  }

  return (
    <div className='form-container' onBlur={handleKeyboardClose}>
      <h1>Ingrese sus datos</h1>
      <div className="inputs-container">
        <div className='input-container'>
          <label>Nombre*</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} style={error.nombre ? {outline: 'red 2px solid' } : {outline: 'none' }}/>
          <span>{error.nombre}</span>
        </div>
        <div className='input-container'>
          <label>Email*</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} style={error.email ? {outline: 'red 2px solid' } : {outline: 'none' }}/>
          <span>{error.email}</span>
        </div>
        <div className='input-container'>
          <label>Teléfono*</label>
          <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} style={error.telefono ? {outline: 'red 2px solid' } : {outline: 'none' }}/>
          <span>{error.telefono}</span>
        </div>
        <div className='input-container'>
          <label>Profesión*</label>
          <input type="text" name="profesion" value={form.profesion} onChange={handleChange} style={error.profesion ? {outline: 'red 2px solid' } : {outline: 'none' }}/>
          <span>{error.profesion}</span>
        </div>
        <div className='input-container'>
          <label>Especialidad*</label>
          <input type="text" name="especialidad" value={form.especialidad} onChange={handleChange} style={error.especialidad ? {outline: 'red 2px solid' } : {outline: 'none' }}/>
          <span>{error.especialidad}</span>
        </div>
        <button onClick={submit} disabled={loading}>{loading ? 'Subiendo datos...' : "Siguiente"}</button>
      </div>      
    </div>
  )
}

export default Form