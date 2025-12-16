import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionGraph } from './evolution-graph';

describe('EvolutionGraph', () => {
  let component: EvolutionGraph;
  let fixture: ComponentFixture<EvolutionGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
