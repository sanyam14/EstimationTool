import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyRelAddEditComponent } from './assembly-rel-add-edit.component';

describe('AssemblyRelAddEditComponent', () => {
  let component: AssemblyRelAddEditComponent;
  let fixture: ComponentFixture<AssemblyRelAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblyRelAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyRelAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
