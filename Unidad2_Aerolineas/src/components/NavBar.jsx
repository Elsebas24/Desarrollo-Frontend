import { Plane } from 'lucide-react';

const NAV_ITEMS = [
    { key: 'vuelos', label: 'Vuelos' },
    { key: 'reservas', label: 'Mis Reservas' },
    { key: 'checkin', label: 'Check-in' }
];

export default function NavBar({ activeView, onNavigate, onPromo, bookingsCount }) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="brand-logo" onClick={() => onNavigate('vuelos')}>
                    <span className="plane-icon"><Plane size={30} /></span>
                    <div>
                        <span className="brand-name">Aerolineas Kaiser</span>
                        <span className="brand-sign">Vuela con nosotros</span>
                    </div>
                </div>
                <div className="nav-links">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.key}
                            type="button"
                            className={`nav-item ${activeView === item.key ? 'active' : ''}`}
                            onClick={() => onNavigate(item.key)}
                        >
                            {item.label}
                            {item.key === 'reservas' && bookingsCount > 0 && (
                                <span className="nav-count">{bookingsCount}</span>
                            )}
                        </button>
                    ))}
                    <button className="btn-promo" onClick={onPromo}>Promo Monterrey</button>
                </div>
            </div>
        </nav>
    );
}
