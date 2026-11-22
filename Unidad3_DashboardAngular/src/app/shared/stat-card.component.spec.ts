import { TestBed } from '@angular/core/testing';
import { StatCardComponent } from './stat-card.component';

describe('StatCardComponent', () => {
  it('muestra la etiqueta y el valor', async () => {
    const fixture = TestBed.createComponent(StatCardComponent);
    fixture.componentRef.setInput('data', {
      icon: 'store', color: 'green', label: 'Ingresos', value: '$34,245',
      footerIcon: 'date_range', footerText: 'Últimas 24 horas',
    });
    await fixture.whenStable();

    const texto = (fixture.nativeElement as HTMLElement).textContent;
    expect(texto).toContain('Ingresos');
    expect(texto).toContain('$34,245');
  });
});
