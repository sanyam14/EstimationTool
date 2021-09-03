import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustVenAddeditComponent } from './cust-ven-addedit.component';

describe('CustVenAddeditComponent', () => {
  let component: CustVenAddeditComponent;
  let fixture: ComponentFixture<CustVenAddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustVenAddeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustVenAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
