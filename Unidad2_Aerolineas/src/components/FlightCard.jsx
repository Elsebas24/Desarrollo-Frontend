import { useState } from 'react';
import { Check, Plane, Zap, Luggage } from 'lucide-react';
import { flightsData, tarifPrices } from '../data/flightsData';

const cityOf = (code) => flightsData.find(a => a.code === code)?.city ?? code;

export default function FlightCard({ flight, passengers, onSelectFlight }) {
    const [selectedTariffKey, setSelectedTariffKey] = useState('ZERO');

    const tariff = tarifPrices[selectedTariffKey];
    const unitPrice = Math.round(flight.basePrice * tariff.multiplier);
    const totalPrice = unitPrice * passengers;

    return (
        <div className="flight-card">
            <div className="flight-card-left">
                <div className="flight-meta-header">
                    <span className="airline-tag">{flight.airline}</span>
                    <span className="flight-number">{flight.flightNumber}</span>
                    <span className="flight-badge-direct"><Check size={12} /> {flight.stops}</span>
                </div>

                <div className="flight-itinerary">
                    <div className="itinerary-node">
                        <span className="time">{flight.departureTime}</span>
                        <span className="airport-code">{flight.origin}</span>
                        <span className="airport-city">{cityOf(flight.origin)}</span>
                    </div>

                    <div className="itinerary-duration-line">
                        <span className="duration-label">{flight.duration}</span>
                        <div className="travel-line">
                            <div className="line-dot"></div>
                            <div className="line-bar"></div>
                            <div className="line-dot"></div>
                        </div>
                        <span className="plane-indicator"><Plane size={16} /></span>
                    </div>

                    <div className="itinerary-node text-right">
                        <span className="time">{flight.arrivalTime}</span>
                        <span className="airport-code">{flight.destination}</span>
                        <span className="airport-city">{cityOf(flight.destination)}</span>
                    </div>
                </div>

                {flight.seatsAvailable <= 5 && (
                    <div className="urgency-pill">
                        <Zap size={14} /> ¡Solo quedan {flight.seatsAvailable} asientos a este precio!
                    </div>
                )}
            </div>

            <div className="flight-card-right">
                <div className="tariff-pills">
                    {Object.entries(tarifPrices).map(([key, t]) => (
                        <button
                            key={key}
                            type="button"
                            className={`tariff-pill-btn ${selectedTariffKey === key ? 'active' : ''}`}
                            onClick={() => setSelectedTariffKey(key)}
                        >
                            <span className="tariff-pill-title">{t.name}</span>
                            <span className="tariff-pill-multiplier">+{Math.round((t.multiplier - 1) * 100)}%</span>
                        </button>
                    ))}
                </div>

                <div className="tariff-description-box">
                    <Luggage size={16} />
                    <small>{tariff.baggage}</small>
                </div>

                <div className="price-section">
                    <span className="price-label">Total ({passengers} {passengers === 1 ? 'adulto' : 'adultos'}):</span>
                    <div className="price-display">
                        <span className="currency">MXN</span>
                        <span className="amount">${totalPrice.toLocaleString('es-MX')}</span>
                    </div>
                    <span className="tua-text">Incluye TUA e impuestos calculados</span>
                </div>

                <button
                    className="btn-select-flight"
                    onClick={() => onSelectFlight({ flight, tariff: tariff.name, unitPrice, totalPrice, passengers })}
                >
                    Seleccionar Vuelo
                </button>
            </div>
        </div>
    );
}
