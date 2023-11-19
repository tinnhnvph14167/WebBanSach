import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pages-detail',
  templateUrl: './pages-detail.component.html',
  styleUrls: ['./pages-detail.component.scss']
})
export class PagesDetailComponent {
  products: any;
  category!: string;
  similarProducts: any[] = [];
  user: any = null
  content!: string
  quantity: number = 1
  isShowModal: boolean = false
  closeIcon = faXmark

  allProducts!: any[];
  page: number = 1;
  tabSize: number = 8;
  tabSizes: number[] = [4, 6, 8, 10, 100]
  count: number = 0

  constructor(
    private router: ActivatedRoute,
    private productService: ProductsService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private cartService: CartService,
    private orderService: OrderService
  ) {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).subscribe((data: any) => {
        this.products = data.products;
        console.log(this.products);

        if (this.products.categoryId._id) {
          this.categoryService.getCategory(this.products.categoryId._id).subscribe((response: any) => {
            this.similarProducts = response.products;
            console.log(response.products);
            this.allProducts = response.data
          })
        }
      });
    }

  }


  onHandleSubmit() {
    this.categoryService.getCategory(this.products.categoryId._id).subscribe((response: any) => {
      console.log(response.data)
      this.similarProducts = response.products;
      this.allProducts = response.data
    }
    )
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


  formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    });

    return formatter.format(value);
  }

  // commets
  formValueFeedback = this.formBuilder.group({
    content: [""],
  })


  handleSearch() {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.auth
    if (!this.user) {
      this.toastr.info("Bạn cần đăng nhập để thực hiện hàng động này", "Nhắc nhở")
      return
    }
    if (this.formValueFeedback.value.content == "") {
      this.toastr.info("Bạn cần nhập nội dung phản hồi", "Cảnh báo")
      return
    }
    const newValue = {
      content: this.formValueFeedback.value.content,
      productId: this.products._id,
      userId: this.user._id
    }


    this.feedbackService.create(newValue).subscribe((resp) => {
      this.toastr.success(resp.message)

      console.log("resp:", resp.message);

      this.formValueFeedback.reset();
      this.router.params.subscribe(({ id }) => {
        if (id) {
          this.productService.getProduct(id).subscribe((data: any) => {
            this.products = data.products;
            console.log("commets:", this.products);
          })
        }

      })
    })

  }


  handleAddToCart() {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.auth
    if (!this.user) {
      this.toastr.info("Bạn cần đăng nhập để thực hiện hàng động này", "Nhắc nhở")
    }
    else {
      const cartItem = {
        userId: this.user._id,
        productId: this.products._id,
        quantity: 1,
        total: Number(this.products.price)
      }

      this.cartService.create(cartItem).subscribe((data) => {
        this.toastr.success(data.message, "Chúc mừng")
      })

    }
  }


  handleAddToCartDetail(productId: any) {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.auth
    console.log(this.user);

    if (!this.user) {
      this.toastr.info("Bạn cần đăng nhập để thực hiện hàng động này", "Nhắc nhở")
    }
    else {
      console.log(productId)
      const cartItem = {
        userId: this.user._id,
        productId: productId._id,
        quantity: 1,
        total: Number(productId.price)
      }

      this.cartService.create(cartItem).subscribe((data) => {
        console.log(data);

        this.toastr.success(data.message, "Chúc mừng")
      })

    }
  }


  handleOrder = () => {
    const newOrder = {
      userId: this.user._id,
      phone: this.user.phone,
      address: this.user.address,
      name: this.user.name,
      productId: this.products._id,
      quantity: this.quantity,
      total: this.quantity * this.products.price
    }

    this.orderService.create(newOrder).subscribe((resp) => {
      this.toastr.success(resp.message)
      this.isShowModal = false
    })
  }

  handleShowModal() {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.auth
    if (!this.user) {
      this.toastr.info("Bạn cần đăng nhập để thực hiện hàng động này", "Nhắc nhở")
    }
    else {
      this.isShowModal = true
    }
  }

  handleClose() {
    this.isShowModal = false
  }

  handleThem = () => {
    this.quantity = this.quantity + 1
  }

  handleBot = () => {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1
    }

  }

}
