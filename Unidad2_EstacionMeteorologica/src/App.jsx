import { useState, useEffect } from 'react'
import { WeatherCard, ForecastCard } from './components/Widgets'
import { describirClima } from './utils/clima'
import { MapPin, Thermometer, Droplets, Wind } from 'lucide-react'

import './App.css'

function App() {
  const [clima, setClima] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const lat = 25.67
    const lon = -100.31
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`

    fetch(url)
      .then(respuesta => {
        if (!respuesta.ok) throw new Error('La API respondió con error')
        return respuesta.json()
      })
      .then(datos => setClima(datos))
      .catch(() => setError('No se pudo obtener el clima. Revisa tu conexión.'))
  }, [])

  if (error) {
    return <p className="mensaje-error">{error}</p>
  }

  if (!clima) {
    return <p className="estado">Cargando clima...</p>
  }

  const actual = describirClima(clima.current.weather_code)
  const IconoActual = actual.Icono
  const hoy = new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="app">
      <header className="app-header">
        <h1>Estación Meteorológica</h1>
        <p className="ubicacion">
          <MapPin size={16} /> Monterrey, N.L. · {hoy}
        </p>
      </header>

      <div className="resumen">
        <section className="hero">
          <div>
            <p className="hero-label">Ahora</p>
            <p className="hero-temp">{Math.round(clima.current.temperature_2m)}°C</p>
            <p className="hero-texto">{actual.texto}</p>
          </div>
          <IconoActual size={128} strokeWidth={1.25} className="hero-icono" />
        </section>

        <div className="cards-grid">
          <WeatherCard titulo="Sensación térmica" valor={clima.current.apparent_temperature} unidad="°C" icono={Thermometer} />
          <WeatherCard titulo="Humedad" valor={clima.current.relative_humidity_2m} unidad="%" icono={Droplets} />
          <WeatherCard titulo="Viento" valor={clima.current.wind_speed_10m} unidad=" km/h" icono={Wind} />
        </div>
      </div>

      <h2>Pronóstico de 7 días</h2>
      <div className="forecast-grid">
        {clima.daily.time.map((fecha, i) => (
          <ForecastCard
            key={fecha}
            fecha={fecha}
            max={clima.daily.temperature_2m_max[i]}
            min={clima.daily.temperature_2m_min[i]}
            codigo={clima.daily.weather_code[i]}
          />
        ))}
      </div>
    </div>
  )

}

export default App
