import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import { ProductsService } from 'src/app/services/products.service';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  category!: any;
  submitValue: boolean = false;
  products!: any;

  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    author: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    status: ['', [Validators.required]],

  })
  

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private routers: Router,
    private router: ActivatedRoute
  ) {
    
    this.productsService.getCategory().subscribe({
      next : (data: any) =>{
        this.category = data.getCategory;
        console.log("thisdata" , this.category)

      },
      error: (error) =>{
        console.log("error",error)
      }
    })


    this.router.paramMap.subscribe(params => {
      const _id = (params.get("id"));
      this.productsService.getProduct(_id).subscribe({
        next: (data: any) => {
          this.products = data.data
          console.log("_id", _id);
          console.log("this.products", this.products  );

          this.categoryForm.patchValue({
            name: data.data.name,
            price: data.data.price,
            description: data.data.description,
            author: data.data.author,
            categoryId: data.data.categoryId._id,
            status: data.data.status,
            image: data.data.image,
          })

        }
      })
    })

  }


  onSelectImage(event: any) {
    this.files.push(...event.addedFiles);
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'upload');
    data.append('cloud_name', 'doa7mkkpq');
    this.productsService.uploadImage(data).subscribe(response => {
      const imageUrl = response.secure_url;
      this.categoryForm.patchValue({ image: imageUrl });
    });
  }

  files: any[] = [];
  url: any = []
  onRemovem(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);

  }



  onhandledSubmit() {
    this.submitValue = true
    if (this.categoryForm.valid) {
      console.log("id",this.products._id)
      const product: any = {
        _id: this.products._id,
        name: this.categoryForm.value.name || '',
        price: this.categoryForm.value.price || 0,
        author: this.categoryForm.value.author || '',
        description: this.categoryForm.value.description || '',
        image: this.categoryForm.value.image || '',
        status: this.categoryForm.value.status || '',
        categoryId: this.categoryForm.value.categoryId || '',

      }
      console.log("product",product);
      this.productsService.updateProduct(product).subscribe((data) => {
        console.log("data",data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập nhập sản phẩm thành công!',
          text: 'Sản phẩm đã được cập nhập thành công!',
          showConfirmButton: false,
          iconHtml: '<i class="fas fa-check-circle"></i>',
          timer: 2000
        })
        this.routers.navigate(['/'])
      }, (error) => {
        alert("Cập nhập không thành công")

      })
    }
  }

}
