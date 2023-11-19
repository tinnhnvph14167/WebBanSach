import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { IProducts } from 'src/app/interface/products';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  category!: any;
  submitValue: boolean = false;

  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    author: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    status:['',[Validators.required]],
 
  })

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private routers: Router
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
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);

  }




  onhandledSubmit() {
    this.submitValue = true;
  
    if (this.categoryForm.valid) {
      const product: any = {
        name: this.categoryForm.value.name || '',
        price: this.categoryForm.value.price || 0,
        author: this.categoryForm.value.author || '',
        description: this.categoryForm.value.description || '',
        image: this.categoryForm.value.image || '',        
        categoryId: this.categoryForm.value.categoryId || '',        
      }
      
      console.log("product",product);     
        this.productsService.addProduct(product).subscribe((data) => {
          console.log("data",data)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'thêm sản phẩm thành công!',
            text: 'Sản phẩm đã được thêm thành công!',
            showConfirmButton: false,
            iconHtml: '<i class="fas fa-check-circle"></i>',
            timer: 2000
          })
          // this.routers.navigate(['/'])
        }, (error) => {
          alert("Thêm không thành công")
        
        })
      
    }
  }

}
