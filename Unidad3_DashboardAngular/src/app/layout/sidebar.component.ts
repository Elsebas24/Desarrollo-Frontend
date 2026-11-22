import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../core/layout.service';
import { MENU } from './menu';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar" [class.open]="layout.menuAbierto()">
      <div class="brand"><span class="logo">A</span> MI DASHBOARD</div>
      <nav>
        @for (item of menu; track item.path) {
          <a [routerLink]="item.path" routerLinkActive="active"
             (click)="layout.cerrarMenu()">
            <span class="material-icons">{{ item.icon }}</span>
            {{ item.label }}
          </a>
        }
      </nav>
    </aside>
  `,
  styles: `
    .sidebar {
      position: fixed; top: 0; bottom: 0; left: 0; z-index: 20;
      width: var(--sidebar-w);
      background: var(--card);
      box-shadow: 0 0 20px rgba(0,0,0,.15);
      padding: 16px;
      transition: transform 0.25s;
    }
    .brand {
      display: flex; align-items: center; gap: 12px;
      font-weight: 500; padding: 8px 8px 24px;
    }
    .logo {
      background: var(--red); color: #fff;
      width: 34px; height: 34px; border-radius: 6px;
      display: grid; place-items: center; font-weight: 700;
    }
    nav { display: flex; flex-direction: column; gap: 6px; }
    a {
      display: flex; align-items: center; gap: 16px;
      padding: 12px 16px; border-radius: 4px;
      color: var(--text); text-decoration: none; font-size: 14px;
    }
    a:hover { background: rgba(128,128,128,.12); }
    a.active {
      background: var(--red); color: #fff;
      box-shadow: 0 4px 14px rgba(244,67,54,.4);
    }

    /* Reto 1: en pantallas chicas el menú se esconde y se abre con la hamburguesa */
    @media (max-width: 991px) {
      .sidebar { transform: translateX(-100%); }
      .sidebar.open { transform: translateX(0); }
    }
  `,
})
export class SidebarComponent {
  protected readonly layout = inject(LayoutService);
  protected readonly menu = MENU;
}
