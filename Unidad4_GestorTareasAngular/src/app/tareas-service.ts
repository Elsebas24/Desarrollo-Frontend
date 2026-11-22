import { Service, computed, effect, signal } from '@angular/core';
import { Tarea } from './tarea';

@Service()
export class TareasService {
  private readonly _tareas = signal<Tarea[]>(this.cargar());

  private siguienteId = this.calcularSiguienteId();

  constructor() {
    effect(() => {
      localStorage.setItem('tareas', JSON.stringify(this._tareas()));
    });
  }

  private cargar(): Tarea[] {
    const guardado = localStorage.getItem('tareas');

    if (guardado) {
      return JSON.parse(guardado);
    }

    return [
      { id: 1, texto: 'Instalar Angular CLI', hecha: true },
      { id: 2, texto: 'Crear mi primer componente', hecha: false },
      { id: 3, texto: 'Entender los signals', hecha: false },
    ];
  }

  private calcularSiguienteId(): number {
    let mayor = 0;

    for (const t of this._tareas()) {
      if (t.id > mayor) {
        mayor = t.id;
      }
    }

    return mayor + 1;
  }

  readonly tareas = this._tareas.asReadonly();
  readonly total = computed(() => this._tareas().length);
  readonly pendientes = computed(
    () => this._tareas().filter((t) => !t.hecha).length
  );

  agregar(texto: string) {
    const limpio = texto.trim();
    if (!limpio) return;
    this._tareas.update((l) => [
      ...l,
      { id: this.siguienteId++, texto: limpio, hecha: false },
    ]);
  }

  alternar(id: number) {
    this._tareas.update((l) =>
      l.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t))
    );
  }

  eliminar(id: number) {
    this._tareas.update((l) => l.filter((t) => t.id !== id));
  }
}
