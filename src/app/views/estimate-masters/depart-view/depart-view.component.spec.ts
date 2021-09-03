import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartViewComponent } from './depart-view.component';

describe('DepartViewComponent', () => {
  let component: DepartViewComponent;
  let fixture: ComponentFixture<DepartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
