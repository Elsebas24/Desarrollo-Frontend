import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

// Reto 4: las páginas se cargan de forma diferida con loadComponent.
const dashboard = () =>
  import('./pages/dashboard.component').then((m) => m.DashboardComponent);

const placeholder = () =>
  import('./pages/placeholder.component').then((m) => m.PlaceholderComponent);

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: dashboard },
      { path: 'perfil', loadComponent: placeholder, data: { nombre: 'Perfil de usuario' } },
      { path: 'tablas', loadComponent: placeholder, data: { nombre: 'Lista de tablas' } },
      { path: 'tipografia', loadComponent: placeholder, data: { nombre: 'Tipografía' } },
      { path: 'iconos', loadComponent: placeholder, data: { nombre: 'Iconos' } },
      { path: 'mapas', loadComponent: placeholder, data: { nombre: 'Mapas' } },
      { path: 'notificaciones', loadComponent: placeholder, data: { nombre: 'Notificaciones' } },
    ],
  },
  { path: '**', redirectTo: '' },
];
