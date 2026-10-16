import { describirClima } from '../utils/clima'

export function WeatherCard({ titulo, valor, unidad, icono: Icono }) {
  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <Icono size={18} />
        <span>{titulo}</span>
      </div>
      <p className="weather-value">
        {valor}<small>{unidad}</small>
      </p>
    </div>
  )
}

export function ForecastCard({ fecha, max, min, codigo }) {
  const { Icono, texto } = describirClima(codigo)

  const dia = new Date(fecha + 'T00:00').toLocaleDateString('es-MX', {
    weekday: 'short',
    day: 'numeric',
  })

  return (
    <div className="forecast-card">
      <p className="forecast-dia">{dia}</p>
      <Icono size={28} strokeWidth={1.5} className="forecast-icono" />
      <p className="forecast-texto">{texto}</p>
      <p className="forecast-temps">
        <span className={`forecast-max ${max >= 30 ? 'calor' : ''}`}>{Math.round(max)}°</span>
        <span className="forecast-min">{Math.round(min)}°</span>
      </p>
    </div>
  )
}
