import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Remotas } from './remotas';

describe('Remotas', () => {
  let component: Remotas;
  let fixture: ComponentFixture<Remotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Remotas],
    }).compileComponents();

    fixture = TestBed.createComponent(Remotas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
