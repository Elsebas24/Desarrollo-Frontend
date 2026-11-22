import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DetalleTarea } from './detalle-tarea';

describe('DetalleTarea', () => {
  let component: DetalleTarea;
  let fixture: ComponentFixture<DetalleTarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleTarea],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleTarea);
    fixture.componentRef.setInput('id', '1');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});