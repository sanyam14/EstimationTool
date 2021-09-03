import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverheadViewComponent } from './overhead-view.component';

describe('OverheadViewComponent', () => {
  let component: OverheadViewComponent;
  let fixture: ComponentFixture<OverheadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverheadViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverheadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
