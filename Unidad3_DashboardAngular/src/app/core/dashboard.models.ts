import { ChartConfiguration, ChartType } from 'chart.js';

export interface StatCard {
  icon: string; // nombre del icono de Material
  color: 'orange' | 'green' | 'red' | 'cyan';
  label: string;
  value: string;
  footerIcon: string;
  footerText: string;
}

export interface ChartCardInfo {
  title: string;
  subtitle: string;
  footer: string;
  color: 'green' | 'orange' | 'red';
  type: ChartType;
  data: ChartConfiguration['data'];
}

export interface Tarea {
  texto: string;
  hecha: boolean;
}

export interface TaskTab {
  id: string;
  label: string;
  icon: string;
  tareas: Tarea[];
}

export interface Employee {
  id: number;
  nombre: string;
  salario: string;
  pais: string;
  ciudad: string;
}

// Reto 3: todo el contenido del dashboard llega en un solo JSON.
export interface DashboardData {
  stats: StatCard[];
  charts: ChartCardInfo[];
  taskTabs: TaskTab[];
  employees: Employee[];
  tabla?: TablaInfo; // Reto 5: textos de la tabla para tus propios datos
}

export interface TablaInfo {
  titulo: string;
  subtitulo: string;
  columnas: string[];
}
