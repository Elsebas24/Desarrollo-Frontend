import { TestBed } from '@angular/core/testing';
import { TasksCardComponent } from './tasks-card.component';

describe('TasksCardComponent', () => {
  it('marca una tarea sin perderla al cambiar de pestaña', () => {
    const fixture = TestBed.createComponent(TasksCardComponent);
    fixture.componentRef.setInput('tabsIniciales', [
      { id: 'bugs', label: 'Bugs', icon: 'bug_report',
        tareas: [{ texto: 'A', hecha: false }] },
      { id: 'web', label: 'Web', icon: 'code', tareas: [] },
    ]);
    const c = fixture.componentInstance;

    c.toggle(0);
    c.activeId.set('web');
    c.activeId.set('bugs');

    expect(c.active()?.tareas[0].hecha).toBe(true);
  });
});
