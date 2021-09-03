import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverHeadAddEditComponent } from './over-head-add-edit.component';

describe('OverHeadAddEditComponent', () => {
  let component: OverHeadAddEditComponent;
  let fixture: ComponentFixture<OverHeadAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverHeadAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverHeadAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
