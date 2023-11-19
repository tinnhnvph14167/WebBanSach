import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent {
  modalSetting = 0
  orderSelected = {} as any
  orderList:any
  filterStatus = 1

  constructor(private OrderService: OrderService, private toastr: ToastrService) {
    this.OrderService.get().subscribe(({ data }) => {
      this.orderList = data.filter((item:any) => item.status == this.filterStatus)
    })
  }

  handleTab = (data:number) => {
    this.filterStatus = data
    this.OrderService.get().subscribe(({ data }) => {
      this.orderList = data.filter((item:any) => item.status == this.filterStatus)
    })
  }

  status:any = {
    0 : "Đã hủy",
    1 : "Đang chờ duyệt",
    2 : "Đang vận chuyển",
    3 : "Đã nhận",
  }
  
  handleCancelModal = () => {
    this.modalSetting = 0
  }

  handleChangeModal = (data:any) => {
    this.orderSelected = data
    this.modalSetting = 2
  }

  handleDeleleModal = (data:any) => {
    this.orderSelected = data
    this.modalSetting = 1
  }

  handleCancelOrder = () => {
    this.OrderService.cancelOrder(this.orderSelected._id).subscribe((resp) => {
      this.toastr.success(resp.message)
      this.modalSetting = 0
      this.OrderService.get().subscribe(({ data }) => {
        this.orderList = data.filter((item:any) => item.status == this.filterStatus)
      })
    }) 
  }

  handleChangeOrder = () => {
    this.OrderService.changeOrder(this.orderSelected._id).subscribe((resp) => {
      this.toastr.success(resp.message)
      this.modalSetting = 0
      this.OrderService.get().subscribe(({ data }) => {
        this.orderList = data.filter((item:any) => item.status == this.filterStatus)
      })
    }) 
  }
}
