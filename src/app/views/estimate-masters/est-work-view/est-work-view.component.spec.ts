import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstWorkViewComponent } from './est-work-view.component';

describe('EstWorkViewComponent', () => {
  let component: EstWorkViewComponent;
  let fixture: ComponentFixture<EstWorkViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstWorkViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstWorkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
