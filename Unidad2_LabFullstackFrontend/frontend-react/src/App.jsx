import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm.jsx'
import TaskItem from './components/TaskItem.jsx'

const API_URL = 'http://localhost:3000/api/tareas'

function App() {
  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [tareaEnEdicion, setTareaEnEdicion] = useState(null)

  useEffect(() => {
    obtenerTareas()
  }, [])

  async function obtenerTareas() {
    try {
      setCargando(true)
      setError(null)
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Error al conectar con la API')
      setTareas(await response.json())
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setCargando(false)
    }
  }

  async function guardarTarea(datos) {
    try {
      const url = tareaEnEdicion ? `${API_URL}/${tareaEnEdicion.id}` : API_URL
      const response = await fetch(url, {
        method: tareaEnEdicion ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      })
      if (!response.ok) throw new Error(tareaEnEdicion ? 'Error al actualizar' : 'Error al crear tarea')
      const tareaGuardada = await response.json()
      setTareas((actuales) => tareaEnEdicion
        ? actuales.map((tarea) => tarea.id === tareaGuardada.id ? tareaGuardada : tarea)
        : [...actuales, tareaGuardada])
      setTareaEnEdicion(null)
    } catch (requestError) {
      window.alert(`Error en la operación: ${requestError.message}`)
    }
  }

  async function toggleCompletada(id, estadoActual) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completada: !estadoActual }),
      })
      if (!response.ok) throw new Error('Error al modificar estado')
      const tareaModificada = await response.json()
      setTareas((actuales) => actuales.map((tarea) => tarea.id === id ? tareaModificada : tarea))
    } catch (requestError) {
      window.alert(requestError.message)
    }
  }

  async function eliminarTarea(id) {
    if (!window.confirm('¿Desea eliminar la tarea?')) return
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Error al eliminar')
      setTareas((actuales) => actuales.filter((tarea) => tarea.id !== id))
    } catch (requestError) {
      window.alert(requestError.message)
    }
  }

  return (
    <main className="container py-5">
      <h1 className="mb-4">Gestor de tareas</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-4">
        <div className="col-lg-4">
          <TaskForm
            onGuardarTarea={guardarTarea}
            tareaEnEdicion={tareaEnEdicion}
              onCancelarEdicion={() => setTareaEnEdicion(null)}
          />
        </div>
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Listado React (Total: {tareas.length})</strong>
              <button className="btn btn-sm btn-outline-primary" onClick={obtenerTareas}>Refrescar</button>
            </div>
            <div className="card-body">
              {cargando && <div className="text-center py-4"><div className="spinner-border text-primary" role="status" /><p className="text-muted mt-2">Cargando estado reactivo...</p></div>}
              {!cargando && !error && tareas.length === 0 && <div className="text-center py-4 text-muted">No existen tareas pendientes.</div>}
              {!cargando && !error && tareas.length > 0 && <div className="table-responsive"><table className="table table-hover align-middle mb-0"><thead className="table-light"><tr><th>Estado</th><th>Título y Descripción</th><th>Prioridad</th><th className="text-end">Acciones</th></tr></thead><tbody>{tareas.map((tarea) => <TaskItem key={tarea.id} tarea={tarea} onToggle={toggleCompletada} onEliminar={eliminarTarea} onEditar={setTareaEnEdicion} />)}</tbody></table></div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
