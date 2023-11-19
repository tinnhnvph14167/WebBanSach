import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.scss']
})
export class LayoutUserComponent {
  searchValue: any;
  isShown: boolean = true
  products: any= null
  maxDisplayedProducts: number = 5;
  showResults: boolean = false;
  isDropdownOpen = false;
  


  constructor(private router: Router,
    private productService: ProductsService,
    private route: ActivatedRoute,
  ) { }
  userName = localStorage.getItem('userName');
  role = localStorage.getItem('role');
  email = localStorage.getItem('email');
  token = localStorage.getItem('token');
  
  showAdmin = true;

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
        
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('user');
        
        
  
        this.userName = null;
        this.role = null;
        this.isDropdownOpen = false; 
  
        Swal.fire(
          'Đăng xuất!',
          'Đăng xuất thành công',
          'success'
        );
      }
    });
  }

  onSearch() {
    if (this.searchValue) {
      this.isShown = true;
      this.productService.getAllProducts().subscribe((response: any) => {
        const searchResults = response.products.filter((product: any) => {
          const productNameMatch = product.name.toLowerCase().includes(this.searchValue.toLowerCase());
          const authorNameMatch = product.author.toLowerCase().includes(this.searchValue.toLowerCase());
          return productNameMatch || authorNameMatch;
                  });
        this.products = searchResults.slice(0, this.maxDisplayedProducts);
        this.showResults = true;
      });
    } else {
      this.showResults = false;
    }
  }


  ngOnInit() {
    this.onSearch();
  }

  onClickOutside() {
    this.isShown = false;
  }

  onClick(item: any) {
    this.isShown = !this.isShown;
    this.router.navigate(['/pages-detail', item._id]).then(() => {
      window.location.reload();
    });
  }

}
