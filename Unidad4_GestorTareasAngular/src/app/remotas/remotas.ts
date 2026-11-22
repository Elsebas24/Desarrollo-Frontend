import { Component, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { TareasService } from '../tareas-service';

interface TareaRemota {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-remotas',
  templateUrl: './remotas.html',
})

export class Remotas {
  private readonly servicio = inject(TareasService);

  protected readonly limite = signal(5);

  protected readonly remotas = httpResource<TareaRemota[]>(
    () => `https://jsonplaceholder.typicode.com/todos?_limit=${this.limite()}`
  );

  protected copiar(r: TareaRemota) {
    this.servicio.agregar(r.title);
  }
}