import { useEffect, useState } from 'react'

export default function TaskForm({ onGuardarTarea, tareaEnEdicion, onCancelarEdicion }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [prioridad, setPrioridad] = useState('Media')

  useEffect(() => {
    setTitulo(tareaEnEdicion?.titulo ?? '')
    setDescripcion(tareaEnEdicion?.descripcion ?? '')
    setPrioridad(tareaEnEdicion?.prioridad ?? 'Media')
  }, [tareaEnEdicion])

  function handleSubmit(event) {
    event.preventDefault()
    if (!titulo.trim()) return

    onGuardarTarea({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      prioridad,
    })

    if (!tareaEnEdicion) {
      setTitulo('')
      setDescripcion('')
      setPrioridad('Media')
    }
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header fw-bold">
        {tareaEnEdicion ? `Editar tarea #${tareaEnEdicion.id}` : 'Nueva tarea'}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="titulo">Titulo</label>
          <input id="titulo" className="form-control mb-3" value={titulo} onChange={(event) => setTitulo(event.target.value)} required />
          <label className="form-label" htmlFor="descripcion">Descripcion</label>
          <textarea id="descripcion" className="form-control mb-3" rows="3" value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
          <label className="form-label" htmlFor="prioridad">Prioridad</label>
          <select id="prioridad" className="form-select mb-3" value={prioridad} onChange={(event) => setPrioridad(event.target.value)}>
            <option>Baja</option>
            <option>Media</option>
            <option>Alta</option>
          </select>
          <button className="btn btn-primary w-100" type="submit">
            {tareaEnEdicion ? 'Actualizar tarea' : 'Guardar tarea'}
          </button>
          {tareaEnEdicion && (
            <button className="btn btn-outline-secondary w-100 mt-2" type="button" onClick={onCancelarEdicion}>
              Cancelar edicion
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
