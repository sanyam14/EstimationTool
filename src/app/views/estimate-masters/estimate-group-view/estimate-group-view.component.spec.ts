import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateGroupViewComponent } from './estimate-group-view.component';

describe('EstimateGroupViewComponent', () => {
  let component: EstimateGroupViewComponent;
  let fixture: ComponentFixture<EstimateGroupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimateGroupViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
