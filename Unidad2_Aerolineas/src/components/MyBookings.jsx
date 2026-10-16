import { Search, ArrowRight, CircleCheck, Clock } from 'lucide-react';

export default function MyBookings({ bookings, onCancel, onGoSearch }) {
    if (bookings.length === 0) {
        return (
            <div className="no-results-card">
                <p>Aún no tienes reservas. ¡Busca tu primer vuelo desde Monterrey!</p>
                <button className="btn-search-flights btn-inline" onClick={onGoSearch}>
                    <Search size={18} /> Buscar Vuelos
                </button>
            </div>
        );
    }

    return (
        <div className="booking-list">
            {bookings.map(b => (
                <div key={b.code} className="booking-item">
                    <div>
                        <span className="booking-code">{b.code}</span>
                        <h4>{b.flight.origin} <ArrowRight size={16} /> {b.flight.destination} • {b.flight.flightNumber}</h4>
                        <p>
                            {b.departureDate} • {b.flight.departureTime} a {b.flight.arrivalTime} •
                            Tarifa <strong>{b.tariff}</strong> • {b.passengers} {b.passengers === 1 ? 'pasajero' : 'pasajeros'}
                        </p>
                    </div>
                    <div className="booking-item-right">
                        <span className="booking-total">${b.totalPrice.toLocaleString('es-MX')} MXN</span>
                        <span className={`status-pill ${b.checkedIn ? 'done' : ''}`}>
                            {b.checkedIn ? <CircleCheck size={12} /> : <Clock size={12} />}
                            {b.checkedIn ? 'Check-in listo' : 'Check-in pendiente'}
                        </span>
                        {!b.checkedIn && (
                            <button className="btn-cancel" onClick={() => onCancel(b.code)}>Cancelar reserva</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
