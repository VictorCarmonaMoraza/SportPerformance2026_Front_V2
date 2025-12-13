import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportLayout } from './sport-layout';

describe('SportLayout', () => {
  let component: SportLayout;
  let fixture: ComponentFixture<SportLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
