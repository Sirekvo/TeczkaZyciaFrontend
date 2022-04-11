import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodInfoComponent } from './blood-info.component';

describe('BloodInfoComponent', () => {
  let component: BloodInfoComponent;
  let fixture: ComponentFixture<BloodInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
