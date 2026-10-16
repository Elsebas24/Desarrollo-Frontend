export const flightsData = [
    {code: 'MTY', name: 'Monterrey - Aeropuerto Intl. Mariano Escobedo',city: 'Monterrey'},
    {code: 'CUN', name: 'Cancún - Aeropuerto Intl. de Cancún', city: 'Cancún'},
    {code: 'MEX', name: 'México - Aeropuerto Intl. de la Ciudad de México', city: 'México'},
    {code: 'GDL', name: 'Guadalajara - Aeropuerto Intl. de Guadalajara', city: 'Guadalajara'},
    {code: 'LAX', name: 'Los Ángeles - Aeropuerto Intl. de Los Ángeles', city: 'Los Ángeles'},
    {code: 'JFK', name: 'Nueva York - Aeropuerto Intl. de Nueva York', city: 'Nueva York'},
    {code: 'NLU', name: 'Santa Lucia - Aeropuerto Intl. Felipe Angeles', city: 'Mexico' }
]

export const flightCatalog = [
    {
        id: 'VB001',
        flightNumber: 'VB001',
        origin: 'MTY',
        destination: 'MEX',
        departureTime: '06:15',
        arrivalTime: '07:30',
        duration: '1h 15m',
        basePrice: 1250,
        seatsAvailable: 8,
        stops: 'Directo',
        airline: 'Aerolineas Kaiser'
    },

    {
        id: 'VB002',
        flightNumber: 'VB002',
        origin: 'MEX',
        destination: 'CUN',
        departureTime: '08:00',
        arrivalTime: '11:30',
        duration: '3h 30m',
        basePrice: 2200,
        seatsAvailable: 5,
        stops: 'Directo',
        airline: 'Aerolineas Kaiser'
    },

    {
        id: 'VB003',
        flightNumber: 'VB003',
        origin: 'CUN',
        destination: 'GDL',
        departureTime: '12:00',
        arrivalTime: '15:00',
        duration: '3h 00m',
        basePrice: 1800,
        seatsAvailable: 7,
        stops: 'Directo',
        airline: 'Aerolineas Kaiser'
    },

    {
        id: 'VB004',
        flightNumber: 'VB004',
        origin: 'MTY',
        destination: 'MEX',
        departureTime: '17:30',
        arrivalTime: '18:45',
        duration: '1h 15m',
        basePrice: 1100,
        seatsAvailable: 3,
        stops: 'Directo',
        airline: 'Aerolineas Kaiser'
    },

    {
        id: 'VB005',
        flightNumber: 'VB005',
        origin: 'MTY',
        destination: 'CUN',
        departureTime: '06:15',
        arrivalTime: '09:35',
        duration: '2h 20m',
        basePrice: 1250,
        seatsAvailable: 8,
        stops: 'Directo',
        airline: 'Aerolineas Kaiser'
    },

    {
        id: 'VB006',
        flightNumber: 'VB006',
        origin: 'MTY',
        destination: 'CUN',
        departureTime: '14:40',
        arrivalTime: '18:00',
        duration: '2h 20m',
        basePrice: 1480,
        seatsAvailable: 4,
        stops: 'Directo',
        airline: 'Aerolineas Kaiser'
    },

    {
        id: 'VB007',
        flightNumber: 'VB007',
        origin: 'MTY',
        destination: 'GDL',
        departureTime: '09:20',
        arrivalTime: '10:45',
        duration: '1h 25m',
        basePrice: 940,
        seatsAvailable: 12,
        stops: 'Directo',
        airline: 'Aerolineas Kaiser'
    },

    {
        id: 'VB008',
        flightNumber: 'VB008',
        origin: 'MTY',
        destination: 'LAX',
        departureTime: '10:00',
        arrivalTime: '11:10',
        duration: '3h 10m',
        basePrice: 3900,
        seatsAvailable: 6,
        stops: 'Directo',
        airline: 'Aerolineas Kaiser'
    },

    {
        id: 'VB009',
        flightNumber: 'VB009',
        origin: 'MTY',
        destination: 'JFK',
        departureTime: '07:45',
        arrivalTime: '12:50',
        duration: '4h 05m',
        basePrice: 4800,
        seatsAvailable: 2,
        stops: 'Directo',
        airline: 'Aerolineas Kaiser'
    },

    {
        id: 'VB010',
        flightNumber: 'VB010',
        origin: 'MTY',
        destination: 'NLU',
        departureTime: '13:10',
        arrivalTime: '14:35',
        duration: '1h 25m',
        basePrice: 990,
        seatsAvailable: 11,
        stops: 'Directo',
        airline: 'Aerolineas Kaiser'
    }

]

export const tarifPrices = {
  ZERO: { name: 'Zero', multiplier: 1.0, baggage: 'Solo objeto personal (mochila)' },
  LIGHT: { name: 'Light', multiplier: 1.25, baggage: 'Objeto personal + Maleta de mano 10kg' },
  EXTRA: { name: 'Smart', multiplier: 1.60, baggage: 'Mano 10kg + Equipaje documentado 25kg + Asiento VIP' }
};
