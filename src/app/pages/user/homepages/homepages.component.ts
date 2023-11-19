import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-homepages',
  templateUrl: './homepages.component.html',
  styleUrls: ['./homepages.component.scss']
})
export class HomepagesComponent {

  products: any = null
  category: any= null
  allCategory!: any[];
  user: any = null
  cartItem: any = null
  quantity: number = 1
 


  page: number = 1;
  tabSize: number = 12;
  tabSizes: number[] = [4, 6, 8, 10, 100]
  count: number = 0
  constructor(private productsSevri: ProductsService,
    private cate: CategoryService,
    private cartService: CartService,
    private navigate: Router,
    private toastr: ToastrService) {
    this.productsSevri.getAllProducts().subscribe((response: any) => {
      this.products = response.products.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      // console.log(response.products);
    })
    this.cate.getAllCategory().subscribe((response: any) => {
      this.category = response.data
      this.allCategory = response.data;

      // console.log(response);


    })
    this.user = JSON.parse(localStorage.getItem("user") as string)?.data
  }
  onHandleSubmit() {
    this.cate.getAllCategory().subscribe((response: any) => {
      console.log(response.data)
      this.category = response.data
      this.allCategory = response.data
    }
    )
  }
  onHandleLimit(event: any) {
    this.tabSize = event.target.value;
    console.log(event.target.value)
    this.page = 1
    this.onHandleSubmit()
    // console.log(this.onHandleSubmit());

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


  handleAddToCart(item:any) {
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

      this.cartService.create(cartItem).subscribe((resp) => {
        console.log(resp);
        
        this.toastr.success(resp.message,"Chúc mừng")
      })
      
    }
  }


}
