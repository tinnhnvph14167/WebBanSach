import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  user!: any[];
  isShown: boolean = true;
  searchValue: any;
  allUsers!: any[]
  //  listmist + page
  page: number = 1;
  tabSize: number = 6;
  tabSizes: any[] = [2, 4, 6, 8, 1000];
  count: number = 0;

  constructor(private userService: UserService) {
    this.userService.geAlltUser().subscribe((response: any) => {
      this.user = response.data
      console.log(response.data);
    })
  }


  onHandleSubmit() {
    this.userService.geAlltUser().subscribe((response: any) => {
      console.log(response.data)
      this.user = response.data
      this.allUsers = response.data
    }
    )
  }
  onHandleLimit(event: any) {
    this.tabSize = event.target.value;
    console.log(event.target.value)
    this.page = 1
    this.onHandleSubmit()

  }

  onHandlesPage(event: any) {
    this.page = event;
    this.onHandleSubmit()

  }



  removeId(_id: any) {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa sản phẩm?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Hủy',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.removeUser(_id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa sản phẩm thành công',
            text: 'Sản phẩm đã được xóa thành công!',
            showConfirmButton: false,
            timer: 2000,
            iconHtml: '<i class="fas fa-check-circle"></i>'
          });
          this.user = this.user.filter(item => item._id !== _id);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Hủy bỏ',
          'Sản phẩm không bị xóa.',
          'info'
        );
      }
    });
  }


  onSearch() {
    console.log(`user:`, this.searchValue);
    this.isShown = true;
    if (this.searchValue === "") {
      this.userService.geAlltUser().subscribe((response: any) => {
        this.user = response.data
        console.log(response.data);
      })
    } else {
      this.userService.geAlltUser().subscribe((response: any) => {
        this.user = response.data.filter((data: any) => {
          const productNameMatch = data.name.toLowerCase().includes(this.searchValue.toLowerCase());
          const emailNameMatch = data.email.toLowerCase().includes(this.searchValue.toLowerCase());
          return productNameMatch || emailNameMatch;
        });
      });
    }
  }

}
