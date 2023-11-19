import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailadminComponent } from './products-detailadmin.component';

describe('ProductsDetailadminComponent', () => {
  let component: ProductsDetailadminComponent;
  let fixture: ComponentFixture<ProductsDetailadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsDetailadminComponent]
    });
    fixture = TestBed.createComponent(ProductsDetailadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
