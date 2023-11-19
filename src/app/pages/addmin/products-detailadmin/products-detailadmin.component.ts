import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-detailadmin',
  templateUrl: './products-detailadmin.component.html',
  styleUrls: ['./products-detailadmin.component.scss']
})
export class ProductsDetailadminComponent {
  products!: any;
  category!: string;

  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService,
    private categoryService: CategoryService
  ) {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getProduct(id).subscribe((data: any) => {
        this.products = data.products;
        console.log(data.products);
        
        
      });
    }

  }
  formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    });

    return formatter.format(value);
  }

}
