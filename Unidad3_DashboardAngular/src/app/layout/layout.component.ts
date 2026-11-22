import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../core/layout.service';
import { SidebarComponent } from './sidebar.component';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent, NavbarComponent],
  template: `
    <app-sidebar />

    <!-- Reto 1: fondo oscuro que cierra el menú al tocarlo -->
    @if (layout.menuAbierto()) {
      <div class="backdrop" (click)="layout.cerrarMenu()"></div>
    }

    <div class="main">
      <app-navbar />
      <main class="content"><router-outlet /></main>
    </div>
  `,
  styles: `
    .main { margin-left: var(--sidebar-w); min-height: 100vh; }
    .content { padding: 10px 30px 30px; }
    .backdrop { display: none; }

    @media (max-width: 991px) {
      .main { margin-left: 0; }
      .content { padding: 10px 16px 30px; }
      .backdrop {
        display: block; position: fixed; inset: 0; z-index: 10;
        background: rgba(0,0,0,.4);
      }
    }
  `,
})
export class LayoutComponent {
  protected readonly layout = inject(LayoutService);
}
