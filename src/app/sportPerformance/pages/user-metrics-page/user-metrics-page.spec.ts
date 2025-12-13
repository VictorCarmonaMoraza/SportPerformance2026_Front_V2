import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMetricsPage } from './user-metrics-page';

describe('UserMetricsPage', () => {
  let component: UserMetricsPage;
  let fixture: ComponentFixture<UserMetricsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMetricsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMetricsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
