// src/data/shoesData.js

// Tabla de equivalencias Salomon (unisex). usW = US Mujer, cm = longitud del pie.
const SIZE_CHART = [
  { eur: "40", uk: "6.5", us: "7", usW: "8.5", cm: "25" },
  { eur: "40 2/3", uk: "7", us: "7.5", usW: "9", cm: "25.5" },
  { eur: "41 1/3", uk: "7.5", us: "8", usW: "9.5", cm: "26" },
  { eur: "42", uk: "8", us: "8.5", usW: "10", cm: "26.5" },
  { eur: "42 2/3", uk: "8.5", us: "9", usW: "10.5", cm: "27" },
  { eur: "43 1/3", uk: "9", us: "9.5", usW: "11", cm: "27.5" },
  { eur: "44", uk: "9.5", us: "10", usW: "11.5", cm: "28" },
  { eur: "44 2/3", uk: "10", us: "10.5", usW: "12", cm: "28.5" },
  { eur: "45 1/3", uk: "10.5", us: "11", usW: "12.5", cm: "29" },
  { eur: "46", uk: "11", us: "11.5", usW: "13", cm: "29.5" }
];

// Combina la tabla de tallas con el stock de cada modelo (0 = agotado)
const withStock = (stocks) => SIZE_CHART.map((size, i) => ({ ...size, stock: stocks[i] }));

export const PRODUCT_DATA = {
  id: "salomon-xt-6-skyline",
  name: "XT-6 EXPANSE / SKYLINE",
  shortName: "XT-6",
  category: "Sportstyle",
  subtitle: "Calzado de trail running legendario y moda técnica urbana",
  badge: "EDICIÓN LIMITADA",
  price: 195.00,
  currency: "EUR",
  rating: 4.85,
  reviewsCount: 142,
  description: "Lanzada originalmente en 2013, la XT-6 es la zapatilla preferida por atletas de ultra-distancia en las condiciones más duras. Hoy vuelve con colores y materiales actualizados, manteniendo el mismo nivel legendario de amortiguación, durabilidad y control cuesta abajo gracias al sistema Agile Chassis™.",
  technologies: [
    { title: "Agile Chassis™ System (ACS)", desc: "Proporciona estabilidad y amortiguación en conjunto con la entresuela EnergyCell+." },
    { title: "Mud Contagrip®", desc: "Diseñado para un agarre máximo en superficies resbaladizas, blandas y accidentadas." },
    { title: "Quicklace™", desc: "Cordones resistentes y minimalistas para atar de un tirón. Fácil de poner, fácil de quitar." },
    { title: "Malla anti-partículas", desc: "Malla ceñida que evita que quede polvo o gravilla atrapada entre el pie y la plantilla." }
  ],
  specs: {
    weight: "365 g",
    drop: "10 mm",
    cushioning: "Máxima",
    footProtection: "Alta",
    terrain: "Terreno mixto / Senderos rocosos"
  },
  variants: [
    {
      id: "v-phantom",
      colorName: "Black / Phantom / Vanilla",
      thumbnail: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80",
      images: [
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    {
      id: "v-white",
      colorName: "Vanilla Ice / Almond Milk / Silver",
      thumbnail: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=300&q=80",
      images: [
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    {
      id: "v-trail",
      colorName: "Copen Blue / Fiery Red / Sulphur",
      thumbnail: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=300&q=80",
      images: [
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85"
      ]
    }
  ],
  sizes: withStock([4, 12, 8, 15, 0, 6, 10, 3, 0, 5])
};

// Desafío 3: modelos adicionales del catálogo
const SPEEDCROSS_6 = {
  id: "salomon-speedcross-6",
  name: "SPEEDCROSS 6",
  shortName: "Speedcross 6",
  category: "Trail Running",
  subtitle: "Agarre agresivo para senderos blandos y técnicos",
  badge: "MÁS VENDIDO",
  price: 140.00,
  currency: "EUR",
  rating: 4.7,
  reviewsCount: 318,
  description: "La Speedcross 6 combina tacos profundos en forma de chevron con un ajuste preciso para dominar el barro y los terrenos blandos sin perder estabilidad.",
  technologies: [
    { title: "Mud Contagrip® TA", desc: "Tacos de 5 mm en chevron para morder el terreno blando y expulsar el barro." },
    { title: "SensiFit™", desc: "Envuelve el pie desde la entresuela hasta los cordones para un ajuste seguro." },
    { title: "EnergyCell™", desc: "Entresuela de EVA que amortigua y devuelve energía en cada zancada." },
    { title: "Quicklace™", desc: "Sistema de cordones de un solo tirón con bolsillo para guardarlos." }
  ],
  specs: {
    weight: "298 g",
    drop: "10 mm",
    cushioning: "Media",
    footProtection: "Alta",
    terrain: "Barro / Terreno blando"
  },
  variants: [
    {
      id: "v-sc-red",
      colorName: "Fiery Red / Black / Sulphur",
      thumbnail: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=300&q=80",
      images: [
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    {
      id: "v-sc-black",
      colorName: "Black / Magnet / Phantom",
      thumbnail: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=300&q=80",
      images: [
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
      ]
    }
  ],
  sizes: withStock([6, 0, 9, 14, 11, 7, 0, 5, 2, 8])
};

const ACS_PRO = {
  id: "salomon-acs-pro",
  name: "ACS PRO ADVANCED",
  shortName: "ACS Pro",
  category: "Sportstyle",
  subtitle: "Estética técnica de los 2000 con tecnología de montaña",
  badge: "NUEVA TEMPORADA",
  price: 180.00,
  currency: "EUR",
  rating: 4.8,
  reviewsCount: 96,
  description: "La ACS Pro rescata el ADN de las zapatillas de aventura de principios de siglo, con un chasis estable y materiales resistentes listos para la ciudad o el sendero.",
  technologies: [
    { title: "Agile Chassis™ System (ACS)", desc: "Guía el pie y aporta estabilidad lateral en terreno irregular." },
    { title: "Contagrip® MA", desc: "Compuesto de goma versátil para superficies mixtas, secas y húmedas." },
    { title: "EnergyCell+", desc: "Espuma de alta respuesta que mantiene la amortiguación kilómetro tras kilómetro." },
    { title: "Quicklace™", desc: "Ajuste rápido y uniforme con un solo tirón." }
  ],
  specs: {
    weight: "340 g",
    drop: "11 mm",
    cushioning: "Alta",
    footProtection: "Media",
    terrain: "Urbano / Senderos mixtos"
  },
  variants: [
    {
      id: "v-acs-silver",
      colorName: "Lunar Rock / Silver Metallic / Ebony",
      thumbnail: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=300&q=80",
      images: [
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    {
      id: "v-acs-white",
      colorName: "White / Vanilla Ice / Feather Gray",
      thumbnail: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=300&q=80",
      images: [
        "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85"
      ]
    }
  ],
  sizes: withStock([3, 7, 0, 10, 12, 9, 4, 0, 6, 2])
};

export const PRODUCTS = [PRODUCT_DATA, SPEEDCROSS_6, ACS_PRO];
