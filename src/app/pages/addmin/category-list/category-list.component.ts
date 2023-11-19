import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 

import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  categorys!: any[];
  isShown: boolean = true;
  searchValue: any;
  allCategory!: any[];
  page : number = 1
  tabSize : number = 3;
  tabSizes : any[]= [2, 4 ,6 ,8,1000]
  count:number=0


  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute,
    private routers: Router) {
    this.categoryService.getAllCategory().subscribe({
      next: (data : any) =>{
        this.categorys = data.getCategory;
        console.log("data",data)
      }
    })
  }

  onHandleSubmit(){
    this.categoryService.getAllCategory().subscribe((response: any) => {
      console.log(response.data)
      this.categorys = response.data
      this.allCategory = response.data
    }
    )
  }
  onHandleLimit(event:any){
    this.tabSize = event.target.value;
    console.log(event.target.value)
    this.page=1
    this.onHandleSubmit()
    console.log(this.onHandleSubmit());
    
  }
  
  onHandlesPage(event:any){
    this.page= event;
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
        this.categoryService.deleteCategory(_id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa sản phẩm thành công',
            text: 'Sản phẩm đã được xóa thành công!',
            showConfirmButton: false,
            timer: 2000,
            iconHtml: '<i class="fas fa-check-circle"></i>'
          });
          this.categorys = this.categorys.filter(item => item._id !== _id);
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
    console.log(`category:`, this.searchValue);
    this.isShown = true;
    if (this.searchValue === "") {
      this.categoryService.getAllCategory().subscribe((response: any) => {
        this.categorys = response.data
        console.log(response.data);

      })
    } else {
      this.categoryService.getAllCategory().subscribe((response: any) => {
        this.categorys = response.data.filter((data: any) => {
          return data.name.toLowerCase().includes(this.searchValue.toLowerCase());
        });
      });
    }
  }


}
