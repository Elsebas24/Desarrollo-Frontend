import { Component, inject } from '@angular/core';
import { DashboardService } from '../core/dashboard.service';
import { StatCardComponent } from '../shared/stat-card.component';
import { ChartCardComponent } from '../shared/chart-card.component';
import { TasksCardComponent } from '../shared/tasks-card.component';
import { EmployeesTableComponent } from '../shared/employees-table.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    StatCardComponent,
    ChartCardComponent,
    TasksCardComponent,
    EmployeesTableComponent,
  ],
  template: `
    @if (datos.isLoading()) {
      <p class="estado">Cargando datos...</p>
    }

    @if (datos.error()) {
      <p class="estado">No se pudieron cargar los datos.</p>
      <button type="button" (click)="datos.reload()">Reintentar</button>
    }

    @if (datos.hasValue()) {
      <section class="grid stats">
        @for (s of datos.value().stats; track s.label) {
          <app-stat-card [data]="s" />
        }
      </section>

      <section class="grid charts">
        @for (c of datos.value().charts; track c.title) {
          <app-chart-card [info]="c" />
        }
      </section>

      <section class="grid bottom">
        <app-tasks-card [tabsIniciales]="datos.value().taskTabs" />
        <app-employees-table [employees]="datos.value().employees"
                             [tabla]="datos.value().tabla" />
      </section>
    }
  `,
  styles: `
    .grid { display: grid; gap: 50px 24px; margin-top: 40px; }
    .stats  { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .charts { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .bottom { grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); }
    .estado { color: var(--muted); }
  `,
})
export class DashboardComponent {
  protected readonly datos = inject(DashboardService).datos;
}
