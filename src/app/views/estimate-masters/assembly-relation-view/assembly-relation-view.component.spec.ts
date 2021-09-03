import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyRelationViewComponent } from './assembly-relation-view.component';

describe('AssemblyRelationViewComponent', () => {
  let component: AssemblyRelationViewComponent;
  let fixture: ComponentFixture<AssemblyRelationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblyRelationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyRelationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
