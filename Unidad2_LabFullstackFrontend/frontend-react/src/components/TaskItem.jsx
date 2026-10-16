export default function TaskItem({ tarea, onToggle, onEliminar, onEditar }) {
  const badgeClass = tarea.prioridad === 'Alta'
    ? 'bg-danger'
    : tarea.prioridad === 'Media'
      ? 'bg-warning text-dark'
      : 'bg-info text-dark'

  return (
    <tr>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          checked={tarea.completada}
          onChange={() => onToggle(tarea.id, tarea.completada)}
          aria-label={`Marcar ${tarea.titulo} como completada`}
        />
      </td>
      <td>
        <strong className={tarea.completada ? 'text-decoration-line-through text-muted' : ''}>
          {tarea.titulo}
        </strong>
        <div className="small text-muted">{tarea.descripcion || 'Sin descripcion'}</div>
      </td>
      <td><span className={`badge ${badgeClass}`}>{tarea.prioridad}</span></td>
      <td className="text-end">
        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEditar(tarea)}>Editar</button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(tarea.id)}>Eliminar</button>
      </td>
    </tr>
  )
}
