import { useState } from 'react'
import { PartyPopper, Flame, ArrowRight } from 'lucide-react'
import NavBar from './components/NavBar'
import FlightSearch from './components/FlightSearch'
import FlightCard from './components/FlightCard'
import BookingModal from './components/BookingModal'
import MyBookings from './components/MyBookings'
import CheckIn from './components/CheckIn'
import { flightCatalog } from './data/flightsData'
import './App.css'

// Monterrey es el hub: solo se muestran vuelos que salen de MTY
const searchFlights = (destination) =>
  flightCatalog.filter(f => f.origin === 'MTY' && f.destination === destination)

// Promo Monterrey: todos los vuelos desde MTY, del más barato al más caro
const promoFlights = () =>
  flightCatalog.filter(f => f.origin === 'MTY').sort((a, b) => a.basePrice - b.basePrice)

function App() {
  const [activeView, setActiveView] = useState('vuelos')
  const [isPromo, setIsPromo] = useState(false)
  const [filteredFlights, setFilteredFlights] = useState(searchFlights('CUN'))
  const [passengers, setPassengers] = useState(1)
  const [searchParams, setSearchParams] = useState({ destination: 'CUN', departureDate: '2026-10-15' })
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(null)
  const [bookings, setBookings] = useState([])
  const [nextBookingNumber, setNextBookingNumber] = useState(1)

  const handleSearch = ({ destination, departureDate, passengers: paxCount }) => {
    setPassengers(paxCount)
    setSearchParams({ destination, departureDate })
    setFilteredFlights(searchFlights(destination))
    setIsPromo(false)
    setBookingConfirmed(null)
  }

  const handlePromo = () => {
    setActiveView('vuelos')
    setFilteredFlights(promoFlights())
    setIsPromo(true)
    setBookingConfirmed(null)
  }

  const handleSelectFlight = (bookingInfo) => {
    setSelectedBooking(bookingInfo)
  }

  const handleConfirmBooking = () => {
    const code = `KSR-${String(nextBookingNumber).padStart(3, '0')}`
    setBookings([...bookings, { ...selectedBooking, code, departureDate: searchParams.departureDate, checkedIn: false }])
    setNextBookingNumber(nextBookingNumber + 1)
    setBookingConfirmed(code)
    setSelectedBooking(null)
  }

  const handleCancelBooking = (code) => {
    setBookings(bookings.filter(b => b.code !== code))
  }

  const handleCheckIn = (code) => {
    setBookings(bookings.map(b => (b.code === code ? { ...b, checkedIn: true } : b)))
  }

  const titles = {
    vuelos: ['Vuela desde Monterrey a México y el Mundo', 'Encuentra las mejores tarifas ultra-low-cost de Aerolineas Kaiser'],
    reservas: ['Mis Reservas', 'Consulta y administra los vuelos que has reservado'],
    checkin: ['Check-in', 'Ahorra tiempo en el aeropuerto haciendo tu check-in en línea']
  }

  return (
    <div className="app-wrapper">
      <NavBar
        activeView={activeView}
        onNavigate={setActiveView}
        onPromo={handlePromo}
        bookingsCount={bookings.length}
      />

      <header className="hero-section">
        <div className="hero-content">
          <h1>{titles[activeView][0]}</h1>
          <p>{titles[activeView][1]}</p>
        </div>
      </header>

      <main className="main-container">
        {activeView === 'vuelos' && (
          <>
            <FlightSearch onSearch={handleSearch} />

            {bookingConfirmed && (
              <div className="banner-success">
                <PartyPopper size={20} /> ¡Tu vuelo ha sido reservado! Código de reserva: <strong>{bookingConfirmed}</strong>. Haz tu check-in desde la pestaña Check-in.
              </div>
            )}

            <section className="results-section">
              <div className="results-header">
                <h2>
                  {isPromo && <Flame size={20} className="icon-promo" />}
                  {isPromo ? 'Promo Monterrey: tarifas más bajas' : 'Vuelos directos encontrados'} ({filteredFlights.length})
                </h2>
                <span className="route-badge">
                  MTY <ArrowRight size={14} /> {isPromo ? 'Todos los destinos' : searchParams.destination} • {searchParams.departureDate}
                </span>
              </div>

              {filteredFlights.length === 0 ? (
                <div className="no-results-card">
                  <p>No se encontraron vuelos directos disponibles para la ruta seleccionada.</p>
                </div>
              ) : (
                <div className="flight-list">
                  {filteredFlights.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      passengers={passengers}
                      onSelectFlight={handleSelectFlight}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {activeView === 'reservas' && (
          <section className="search-widget-card">
            <MyBookings
              bookings={bookings}
              onCancel={handleCancelBooking}
              onGoSearch={() => setActiveView('vuelos')}
            />
          </section>
        )}

        {activeView === 'checkin' && (
          <CheckIn bookings={bookings} onCheckIn={handleCheckIn} />
        )}
      </main>

      <BookingModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onConfirm={handleConfirmBooking}
      />

      <footer className="app-footer">
        <p>© 2026 Aerolineas Kaiser S.A. de C.V. — Práctica de Laboratorio Universitaria React + Vite.</p>
      </footer>
    </div>
  )
}

export default App
