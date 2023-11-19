import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  submitValue: boolean = false;
  category!: any;

  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    
  })

  constructor(private formBuilder: FormBuilder,
    private cate: CategoryService,
    private routers: Router) { }

  onhandledSubmit() {
    this.submitValue = true
    console.log("this.categoryForm.valid",this.categoryForm.value)
    if (this.categoryForm.valid) {
      
      const category: any = {
        name: this.categoryForm.value.name || '',
        description: this.categoryForm.value.description || '',
        
      }
      this.cate.categoryAdd(category).subscribe( (category) => {
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'thêm Danh mục thành công!',
          text: 'Danh mục đã được thêm thành công!',
          showConfirmButton: false,
          iconHtml: '<i class="fas fa-check-circle"></i>',
          timer: 2000
        })
        this.routers.navigate(['category'])
      }, (error) => {
        alert("Thêm không thành công")

      })
    }
  }

}
