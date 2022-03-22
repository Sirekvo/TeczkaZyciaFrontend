import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConfirmMailComponent } from './page-confirm-mail.component';

describe('PageConfirmMailComponent', () => {
  let component: PageConfirmMailComponent;
  let fixture: ComponentFixture<PageConfirmMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageConfirmMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageConfirmMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
