import { useState } from 'react';
import { CircleCheck, CircleAlert, Ticket } from 'lucide-react';

export default function CheckIn({ bookings, onCheckIn }) {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const booking = bookings.find(b => b.code === code.trim().toUpperCase());

        if (!booking) {
            setMessage({ type: 'error', text: 'No encontramos una reserva con ese código.' });
        } else if (booking.checkedIn) {
            setMessage({ type: 'ok', text: `La reserva ${booking.code} ya tiene check-in. ¡Buen viaje!` });
        } else {
            onCheckIn(booking.code);
            setMessage({ type: 'ok', text: `Check-in listo para ${booking.code}. Preséntate en la sala 30 min antes.` });
        }
    };

    return (
        <div className="search-widget-card">
            <div className="search-title">
                <h3>Check-in en línea</h3>
                <p>Escribe el código de tu reserva (lo encuentras en "Mis Reservas")</p>
            </div>

            <form onSubmit={handleSubmit} className="search-form-grid">
                <div className="form-field">
                    <label>Código de reserva</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="form-input"
                        placeholder="Ej. KSR-001"
                        required
                    />
                </div>
                <div className="form-field form-submit-container">
                    <button type="submit" className="btn-search-flights"><Ticket size={18} /> Hacer Check-in</button>
                </div>
            </form>

            {message && (
                <div className={message.type === 'ok' ? 'banner-success checkin-msg' : 'banner-error checkin-msg'}>
                    {message.type === 'ok' ? <CircleCheck size={20} /> : <CircleAlert size={20} />}
                    {message.text}
                </div>
            )}
        </div>
    );
}
