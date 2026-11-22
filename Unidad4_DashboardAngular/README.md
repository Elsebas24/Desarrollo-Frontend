# Unidad 4 · Dashboard en Angular 22

Dashboard administrativo con menú lateral, barra superior, 4 tarjetas de
indicadores, 3 gráficas (Chart.js + ng2-charts), tareas con pestañas y tabla.

## Instalar y ejecutar

```bash
npm install
ng serve
```

Abre http://localhost:4200

## Pruebas y compilación

```bash
ng test
ng build
```

## Estructura

```
src/app/
├── core/      dashboard.models.ts, dashboard.service.ts, layout.service.ts
├── layout/    layout, sidebar, navbar y menu.ts
├── shared/    stat-card, chart-card, tasks-card, employees-table
├── pages/     dashboard y placeholder
├── app.routes.ts
└── app.config.ts
public/data/   dashboard.json y robot.json (datos del dashboard)
```

## Retos extra implementados

1. **Menú hamburguesa**: en pantallas de 991 px o menos el sidebar se oculta y se abre con el botón ☰.
2. **Modo oscuro**: botón en la barra superior que cambia las variables CSS de `:root`; se recuerda en localStorage.
3. **Datos desde JSON**: `DashboardService` usa `httpResource` para leer `public/data/dashboard.json` (`provideHttpClient()` en `app.config.ts`).
4. **Carga diferida**: las páginas usan `loadComponent` en `app.routes.ts`.
5. **Datos propios**: en `dashboard.service.ts` cambia `URL_DATOS` a `'data/robot.json'` para ver la telemetría de un robot (batería, velocidad, temperatura).
