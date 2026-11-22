import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  beforeEach(() => localStorage.clear());

  it('abre y cierra el menú', () => {
    const s = TestBed.inject(LayoutService);
    s.alternarMenu();
    expect(s.menuAbierto()).toBe(true);
    s.cerrarMenu();
    expect(s.menuAbierto()).toBe(false);
  });

  it('activa el modo oscuro en <html>', () => {
    const s = TestBed.inject(LayoutService);
    s.alternarTema();
    TestBed.tick();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
