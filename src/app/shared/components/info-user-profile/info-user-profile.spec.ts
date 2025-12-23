import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUserProfile } from './info-user-profile';

describe('InfoUserProfile', () => {
  let component: InfoUserProfile;
  let fixture: ComponentFixture<InfoUserProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoUserProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoUserProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
