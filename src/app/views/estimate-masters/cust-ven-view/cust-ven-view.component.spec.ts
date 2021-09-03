import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustVenViewComponent } from './cust-ven-view.component';

describe('CustVenViewComponent', () => {
  let component: CustVenViewComponent;
  let fixture: ComponentFixture<CustVenViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustVenViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustVenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
