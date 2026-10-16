import { Plane, X, ArrowRight, Info } from 'lucide-react';

export default function BookingModal({ booking, onClose, onConfirm }) {
    if (!booking) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="modal-header">
                    <h3><Plane size={20} /> ¡Confirmación de Vuelo!</h3>
                    <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="modal-body">
                    <div className="summary-banner">
                        <strong>Ruta:</strong> {booking.flight.origin} <ArrowRight size={14} /> {booking.flight.destination}
                    </div>

                    <table className="modal-summary-table">
                        <tbody>
                            <tr>
                                <td>Vuelo:</td>
                                <td><strong>{booking.flight.flightNumber} ({booking.flight.airline})</strong></td>
                            </tr>
                            <tr>
                                <td>Horario:</td>
                                <td>{booking.flight.departureTime} a {booking.flight.arrivalTime} ({booking.flight.duration})</td>
                            </tr>
                            <tr>
                                <td>Tarifa Elegida:</td>
                                <td><span className="badge-tariff">{booking.tariff}</span></td>
                            </tr>
                            <tr>
                                <td>Pasajeros:</td>
                                <td>{booking.passengers}</td>
                            </tr>
                            <tr>
                                <td>Precio por pasajero:</td>
                                <td>${booking.unitPrice.toLocaleString('es-MX')} MXN</td>
                            </tr>
                            <tr className="total-row">
                                <td>Total a Pagar:</td>
                                <td className="total-val">${booking.totalPrice.toLocaleString('es-MX')} MXN</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="alert-note">
                        <Info size={16} /> Nota: Esta es una reserva simulada con diccionarios de datos en memoria para la sesión práctica.
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                    <button className="btn-confirm" onClick={onConfirm}>Confirmar y Emitir Boleto</button>
                </div>
            </div>
        </div>
    );
}
