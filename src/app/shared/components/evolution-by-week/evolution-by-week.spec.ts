import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionByWeek } from './evolution-by-week';

describe('EvolutionByWeek', () => {
  let component: EvolutionByWeek;
  let fixture: ComponentFixture<EvolutionByWeek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionByWeek]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionByWeek);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
