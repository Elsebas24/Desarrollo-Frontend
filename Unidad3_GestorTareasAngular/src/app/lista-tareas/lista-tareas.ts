import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, required, minLength } from '@angular/forms/signals';
import { TareaItem } from '../tarea-item/tarea-item';
import { TareasService } from '../tareas-service';

@Component({
  selector: 'app-lista-tareas',
  imports: [TareaItem, FormField],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.css',
})
export class ListaTareas {
  private readonly servicio = inject(TareasService);

  protected readonly tareas = this.servicio.tareas;
  protected readonly total = this.servicio.total;
  protected readonly pendientes = this.servicio.pendientes;
  protected readonly filtro = signal('todas');

  protected readonly filtradas = computed(() => {
    const f = this.filtro();
    const lista = this.tareas();

    if (f === 'pendientes') {
      return lista.filter((t) => !t.hecha);
    }
    if (f === 'hechas') {
      return lista.filter((t) => t.hecha);
    }
    return lista;
  });

  protected readonly nueva = signal({ texto: '' });

  protected readonly nuevaForm = form(this.nueva, (campo) => {
    required(campo.texto);
    minLength(campo.texto, 3);
  });

  protected guardar(event: Event) {
    event.preventDefault();

    if (this.nuevaForm().invalid()) {
      return;
    }

    this.agregar(this.nueva().texto);
    this.nueva.set({ texto: '' });
  }
  
  protected agregar(texto: string) { this.servicio.agregar(texto); }
  protected alternar(id: number) { this.servicio.alternar(id); }
  protected eliminar(id: number) { this.servicio.eliminar(id); }
}
