import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent {
  userName = localStorage.getItem('userName');
  role = localStorage.getItem('role');
  email = localStorage.getItem('email');
  isLoggedIn = localStorage.getItem('isLoggedIn')
  showAdmin = true;
  showResults: boolean = false;
  isDropdownOpen = false;

  constructor(private router: Router,) {
    
    console.log(this.role);
  }


  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  outsideClick(event: Event) {
    if (!(event.target as HTMLElement).closest('.avatar')) {
      this.isDropdownOpen = false;
    }
  }
  
  logout() {
    Swal.fire({
      title: 'Đăng xuất',
      text: "Bạn chắc là muốn Đăng xuất chứ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.showAdmin = false;
        // Xóa token khỏi local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('role');
  
        this.userName = null;
        this.role = null;
        this.isDropdownOpen = false; // Đặt lại trạng thái dropdown menu thành false sau khi đăng xuất
  
        Swal.fire(
          'Đăng xuất!',
          'Đăng xuất thành công',
          'success'
        );
        this.router.navigate(['/'])
      }
    });
  }
}
