import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCategoryViewComponent } from './markup-category-view.component';

describe('MarketCategoryViewComponent', () => {
  let component: MarketCategoryViewComponent;
  let fixture: ComponentFixture<MarketCategoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketCategoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
