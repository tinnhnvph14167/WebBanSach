import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  isFalse = false

  user: any = null

  cartList: any = null
  productList: any = null

  totalQuantity: number = 0
  totalPrice: number = 0

  allCart!: any[];
  page: number = 1;
  tabSize: number = 4;
  tabSizes: number[] = [4, 6, 8, 10, 100]
  count: number = 0

  constructor(private cartService: CartService, private productService: ProductsService,
    private navigate: Router, private toastr: ToastrService,
    private orderService: OrderService,) {
  }


  handleReset() {
    this.totalQuantity = 0
    this.totalPrice = 0
    for (let index = 0; index < this.cartList.cartItems.length; index++) {
      this.totalQuantity += this.cartList.cartItems[index].quantity
      this.totalPrice += this.cartList.cartItems[index].total
    }
  }

  onHandleSubmit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.productList = data
      this.allCart = data
    })
  }

  onHandleLimit(event: any) {
    this.tabSize = event.target.value;
    console.log(event.target.value)
    this.page = 1
    this.onHandleSubmit()
    console.log(this.onHandleSubmit());

  }

  onHandlesPage(event: any) {
    this.page = event;
    this.onHandleSubmit()

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.auth

    this.productService.getAllProducts().subscribe((data) => {
      this.productList = data
    })

    if (!this.user) {
      this.navigate.navigate(['login'])
      return
    }
    this.cartService.getOne(this.user._id).subscribe(({ data }) => {
      this.cartList = data
      console.log(data);

      console.log(this.cartList);

      this.handleReset()
    })
  }

  handleThem(productId: string, quantity: number, price: number) {
    const newItem = {
      userId: this.user._id,
      productId,
      quantity: quantity + 1,
      total: (quantity + 1) * price
    }

    console.log(newItem);


    this.cartService.create(newItem).subscribe(() => {
      this.cartService.getOne(this.user._id).subscribe(({ data }) => {
        this.cartList = data
        this.handleReset()
      })
    })

  }

  handleBot(productId: string, quantity: number, price: number) {
    const newItem = {
      userId: this.user._id,
      productId,
      quantity: quantity - 1,
      total: (quantity - 1) * price
    }

    this.cartService.create(newItem).subscribe((resp) => {
      this.cartService.getOne(this.user._id).subscribe(({ data }) => {
        this.cartList = data
        this.handleReset()
      })
    })

  }

  handleRemove(id: string) {
    this.cartService.delete(id).subscribe((data: any) => {
      this.toastr.success(data.message, "Chúc mừng")
      this.cartService.getOne(this.user._id).subscribe(({ data }) => {
        this.cartList = data
        console.log(data);

        this.handleReset()
      })
    })
  }



  formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    });

    return formatter.format(value);
  }

  handleOrder = () => {
    if (this.cartList.cartItems.length == 0) {
      this.toastr.info("Giỏ hàng của bạn đang trống.", "Cảnh báo")
      return
    }
    const newOrder = {
      userId: this.user._id,
      phone: this.user.phone,
      address: this.user.address,
      name: this.user.name,
    }

    this.orderService.create(newOrder).subscribe((resp) => {
      this.toastr.success(resp.message)
      this.navigate.navigate(['/'])
    })

  }


}
