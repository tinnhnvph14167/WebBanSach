import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, Validators } from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {
  submitValue: boolean = false;
  categorys!: any;

  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder,
    private cate: CategoryService,
    private route: ActivatedRoute,
    private routers: Router) {
    this.route.paramMap.subscribe(params => {
      const _id = (params.get('id'));
      console.log("id",_id)
      this.cate.getCategory(_id).subscribe((data => {
        this.categorys = data.data;
        console.log("this.categorys",this.categorys);

        this.categoryForm.patchValue({
          name: this.categorys.dataname,
          description: this.categorys.description,
          
        })
      }))
    })
  }

  onhandledSubmit() {
    this.submitValue = true
    if (this.categoryForm.valid) {
      const category: any = {
        _id: this.categorys._id,
        name: this.categoryForm.value.name || '',
        description: this.categoryForm.value.description || '',
        
      }


      this.cate.categoryUpdate(category).subscribe(data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập nhập danh mục thành công!',
          text: 'Danh mục đã được cập nhập thành công!',
          showConfirmButton: false,
          iconHtml: '<i class="fas fa-check-circle"></i>',
          timer: 2000
        })
        this.routers.navigate(['admin/category'])
      }, (error) => {
        alert("Cập nhập không thành công")

      })
    }
  }

}
