import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router ,Route} from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import {IProducts} from 'src/app/interface/products'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  products!: IProducts[];

  // isShown: boolean = true;
  constructor( private productsService : ProductsService){
    this.productsService.getAllProducts().subscribe({
      next : (data : any) => {
        this.products = data.getProducts;
        console.log("data",data.getProducts)
      }
      
    })
  }
  removeProduct(id: any){
    const confirm = window.confirm("Ban co chac muon xoa khong?")
    if(!confirm) return;
    this.productsService.deleteProduct(id).subscribe({
      next : () =>{
          alert("xoa thanh cong")
      },
      error: (error) =>{
        console.log("error")
      }
    })

  }

   
}
