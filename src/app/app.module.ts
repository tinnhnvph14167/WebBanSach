import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { ClickOutsideModule } from 'ng-click-outside';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './pages/addmin/list/list.component';
import { AddComponent } from './pages/addmin/add/add.component';
import { EditComponent } from './pages/addmin/edit/edit.component';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginatePipe , NgxPaginationModule, } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';



import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { CategoryAddComponent } from './pages/addmin/category-add/category-add.component';
import { CategoryEditComponent } from './pages/addmin/category-edit/category-edit.component';
import { CategoryListComponent } from './pages/addmin/category-list/category-list.component';
import { SigupComponent } from './pages/auth/sigup/sigup.component';
import { SiginComponent } from './pages/auth/sigin/sigin.component'; 
import { HomepagesComponent } from './pages/user/homepages/homepages.component';
import { LayoutUserComponent } from './layout/layout-user/layout-user.component';
import { PagesDetailComponent } from './pages/user/pages-detail/pages-detail.component';
import { CategoryDetailComponent } from './pages/user/category-detail/category-detail.component';
import { ListUserComponent } from './pages/addmin/addmin-user/list-user/list-user.component';
import { AdminOrderComponent } from './pages/addmin/order-admin/admin-order/admin-order.component';
import { ProductsSearchComponent } from './pages/user/products-search/products-search.component';
import { CartComponent } from './pages/user/cart/cart.component';
import { EditUserComponent } from './pages/addmin/addmin-user/edit-user/edit-user.component';
import { ProductsDetailadminComponent } from './pages/addmin/products-detailadmin/products-detailadmin.component';
import { DashboardComponent } from './pages/addmin/admin-dashboard/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    LayoutAdminComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryListComponent,
    SigupComponent,
    SiginComponent,
    HomepagesComponent,
    LayoutUserComponent,
    PagesDetailComponent,
    CategoryDetailComponent,
    ListUserComponent,
    AdminOrderComponent,
    ProductsSearchComponent,
    CartComponent,
    EditUserComponent,
    ProductsDetailadminComponent,
    DashboardComponent,

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    FormsModule,
    ClickOutsideModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    RouterModule
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
