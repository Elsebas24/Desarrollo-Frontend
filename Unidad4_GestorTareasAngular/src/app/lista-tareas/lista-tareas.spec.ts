import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ListaTareas } from './lista-tareas';

describe('ListaTareas', () => {
  let component: ListaTareas;
  let fixture: ComponentFixture<ListaTareas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTareas],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTareas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
