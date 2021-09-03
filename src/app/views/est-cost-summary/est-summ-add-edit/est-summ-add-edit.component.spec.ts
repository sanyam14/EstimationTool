import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstSummAddEditComponent } from './est-summ-add-edit.component';

describe('EstSummAddEditComponent', () => {
  let component: EstSummAddEditComponent;
  let fixture: ComponentFixture<EstSummAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstSummAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstSummAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
