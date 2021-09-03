import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstAddEditItemComponent } from './est-add-edit-item.component';

describe('EstAddEditItemComponent', () => {
  let component: EstAddEditItemComponent;
  let fixture: ComponentFixture<EstAddEditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstAddEditItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstAddEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
