import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryviewComponent } from './categoryview.component';

describe('CategoryviewComponent', () => {
  let component: CategoryviewComponent;
  let fixture: ComponentFixture<CategoryviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
