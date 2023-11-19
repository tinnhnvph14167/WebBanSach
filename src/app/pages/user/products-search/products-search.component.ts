import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.scss']
})
export class ProductsSearchComponent {
  searchValue: string = '';
  products: any[] = [];
  allProducts!: any[];
  page: number = 1;
  tabSize: number = 8;
  tabSizes: number[] = [4, 6, 8, 10, 100]
  count: number = 0
  user: any = null
  
  noResultsFound: boolean = false;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['value'];
      this.searchProducts();
      
    });
  }

  searchProducts() {
    this.productService.getAllProducts().subscribe((response: any) => {
      this.allProducts = response.products
      console.log(this.products);
      
      this.products = response.products.filter((product: any) => {
        const productNameMatch = product.name.toLowerCase().includes(this.searchValue.toLowerCase());
        const authorNameMatch = product.author.toLowerCase().includes(this.searchValue.toLowerCase());
        return productNameMatch || authorNameMatch;
      });
  
      this.noResultsFound = this.products.length === 0;
    });
  }


  onHandleSubmit() {
    this.productService.getAllProducts().subscribe((response: any) => {
      this.allProducts = response.products
      this.products = response.products.filter((product: any) => {
        const productNameMatch = product.name.toLowerCase().includes(this.searchValue.toLowerCase());
        const authorNameMatch = product.author.toLowerCase().includes(this.searchValue.toLowerCase());
        return productNameMatch || authorNameMatch;
      });
  
      this.noResultsFound = this.products.length === 0;
    });
  }
  
  onHandleLimit(event: any) {
    this.tabSize = event.target.value;
    this.page = 1
    this.onHandleSubmit()
    console.log(this.onHandleSubmit());

  }

  onHandlesPage(event: any) {
    this.page = event;
    this.onHandleSubmit()

  }


  formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    });

    return formatter.format(value);
  }

  handleAddToCartSearch(item: any) {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.auth
    console.log(this.user);

    if (!this.user) {
      this.toastr.info("Bạn cần đăng nhập để thực hiện hàng động này", "Nhắc nhở")
    }
    else {
      console.log(item)
      const cartItem = {
        userId: this.user._id,
        productId: item._id,
        quantity: 1,
        total: Number(item.price)
      }

      this.cartService.create(cartItem).subscribe((data) => {
        console.log(data);

        this.toastr.success(data.message, "Chúc mừng")
      })

    }
  }
}
