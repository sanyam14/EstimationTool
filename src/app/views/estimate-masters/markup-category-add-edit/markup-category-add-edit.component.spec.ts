import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCategoryAddEditComponent } from './markup-category-add-edit.component';

describe('MarketCategoryAddEditComponent', () => {
  let component: MarketCategoryAddEditComponent;
  let fixture: ComponentFixture<MarketCategoryAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketCategoryAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketCategoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
