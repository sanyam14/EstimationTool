import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstViewitemComponent } from './est-viewitem.component';

describe('EstViewitemComponent', () => {
  let component: EstViewitemComponent;
  let fixture: ComponentFixture<EstViewitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstViewitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstViewitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
