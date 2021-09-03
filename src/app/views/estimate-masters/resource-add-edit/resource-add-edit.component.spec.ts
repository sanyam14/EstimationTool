import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAddEditComponent } from './resource-add-edit.component';

describe('ResourceAddEditComponent', () => {
  let component: ResourceAddEditComponent;
  let fixture: ComponentFixture<ResourceAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
