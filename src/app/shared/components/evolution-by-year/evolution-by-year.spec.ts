import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionByYear } from './evolution-by-year';

describe('EvolutionByYear', () => {
  let component: EvolutionByYear;
  let fixture: ComponentFixture<EvolutionByYear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionByYear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionByYear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
