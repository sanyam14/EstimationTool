import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartAddEditComponent } from './depart-add-edit.component';

describe('DepartAddEditComponent', () => {
  let component: DepartAddEditComponent;
  let fixture: ComponentFixture<DepartAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
