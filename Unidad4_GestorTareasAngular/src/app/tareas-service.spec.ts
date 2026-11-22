import { TestBed } from '@angular/core/testing';
import { TareasService } from './tareas-service';

describe('TareasService', () => {
  let servicio: TareasService;

  beforeEach(() => {
    localStorage.clear();    
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(TareasService);
  });

  it('agrega una tarea', () => {
    const antes = servicio.total();
    servicio.agregar('Estudiar Angular');
    expect(servicio.total()).toBe(antes + 1);
  });

  it('ignora textos vacíos', () => {
    const antes = servicio.total();
    servicio.agregar(' ');
    expect(servicio.total()).toBe(antes);
  });

  it('actualiza el contador de pendientes al completar una tarea', () => {
    const antes = servicio.pendientes();
    servicio.alternar(2);
    expect(servicio.pendientes()).toBe(antes - 1);
  });
});