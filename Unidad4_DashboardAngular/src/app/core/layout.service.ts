import { Injectable, effect, signal } from '@angular/core';

// Estado compartido del marco: menú en celular (reto 1) y modo oscuro (reto 2).
@Injectable({ providedIn: 'root' })
export class LayoutService {
  readonly menuAbierto = signal(false);
  readonly oscuro = signal(localStorage.getItem('oscuro') === 'si');

  constructor() {
    effect(() => {
      const activo = this.oscuro();
      document.documentElement.classList.toggle('dark', activo);
      localStorage.setItem('oscuro', activo ? 'si' : 'no');
    });
  }

  alternarMenu() {
    this.menuAbierto.update((v) => !v);
  }

  cerrarMenu() {
    this.menuAbierto.set(false);
  }

  alternarTema() {
    this.oscuro.update((v) => !v);
  }
}
