import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstSummViewComponent } from './est-summ-view.component';

describe('EstSummViewComponent', () => {
  let component: EstSummViewComponent;
  let fixture: ComponentFixture<EstSummViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstSummViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstSummViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
