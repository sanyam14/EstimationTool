import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateGroupAddEditComponent } from './estimate-group-add-edit.component';

describe('EstimateGroupAddEditComponent', () => {
  let component: EstimateGroupAddEditComponent;
  let fixture: ComponentFixture<EstimateGroupAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimateGroupAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateGroupAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
