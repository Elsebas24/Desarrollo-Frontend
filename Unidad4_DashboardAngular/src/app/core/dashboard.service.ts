import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { DashboardData } from './dashboard.models';

// Reto 3: los datos vienen de un JSON en la carpeta public/data.
// Reto 5: cambia a 'data/robot.json' para ver la telemetría de un robot.
const URL_DATOS = 'data/dashboard.json';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  readonly datos = httpResource<DashboardData>(() => URL_DATOS);
}
