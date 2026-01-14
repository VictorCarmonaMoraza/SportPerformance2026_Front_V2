import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPrediction } from './chart-prediction';

describe('ChartPrediction', () => {
  let component: ChartPrediction;
  let fixture: ComponentFixture<ChartPrediction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartPrediction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPrediction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
