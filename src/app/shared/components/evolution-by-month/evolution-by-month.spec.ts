import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionByMonth } from './evolution-by-month';

describe('EvolutionByMonth', () => {
  let component: EvolutionByMonth;
  let fixture: ComponentFixture<EvolutionByMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionByMonth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionByMonth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
