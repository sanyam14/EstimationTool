import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstWorkAddEditComponent } from './est-work-add-edit.component';

describe('EstWorkAddEditComponent', () => {
  let component: EstWorkAddEditComponent;
  let fixture: ComponentFixture<EstWorkAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstWorkAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstWorkAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
