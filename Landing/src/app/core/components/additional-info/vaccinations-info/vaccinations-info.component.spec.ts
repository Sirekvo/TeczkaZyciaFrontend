import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationsInfoComponent } from './vaccinations-info.component';

describe('AccountProfileComponent', () => {
  let component: VaccinationsInfoComponent;
  let fixture: ComponentFixture<VaccinationsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
