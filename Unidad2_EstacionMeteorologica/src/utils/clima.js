import { Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, Snowflake, CloudLightning } from 'lucide-react'

export function describirClima(codigo) {
  if (codigo === 0) return { Icono: Sun, texto: 'Despejado' }
  if (codigo <= 2) return { Icono: CloudSun, texto: 'Parcialmente nublado' }
  if (codigo === 3) return { Icono: Cloud, texto: 'Nublado' }
  if (codigo <= 48) return { Icono: CloudFog, texto: 'Niebla' }
  if (codigo <= 57) return { Icono: CloudDrizzle, texto: 'Llovizna' }
  if (codigo <= 67) return { Icono: CloudRain, texto: 'Lluvia' }
  if (codigo <= 77) return { Icono: Snowflake, texto: 'Nieve' }
  if (codigo <= 82) return { Icono: CloudRain, texto: 'Lluvia intermitente' }
  return { Icono: CloudLightning, texto: 'Tormenta' }
}
