import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/addmin/list/list.component';
import { AddComponent } from './pages/addmin/add/add.component';
import { EditComponent } from './pages/addmin/edit/edit.component';
import { CategoryListComponent } from './pages/addmin/category-list/category-list.component';
import { CategoryAddComponent } from './pages/addmin/category-add/category-add.component';
import { CategoryEditComponent } from './pages/addmin/category-edit/category-edit.component';
import { SiginComponent } from './pages/auth/sigin/sigin.component';
import { SigupComponent } from './pages/auth/sigup/sigup.component';
import { LayoutUserComponent } from './layout/layout-user/layout-user.component';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { HomepagesComponent } from './pages/user/homepages/homepages.component';
import { PagesDetailComponent } from './pages/user/pages-detail/pages-detail.component';
import { CategoryDetailComponent } from './pages/user/category-detail/category-detail.component';
import { ListUserComponent } from './pages/addmin/addmin-user/list-user/list-user.component';
import { ProductsSearchComponent } from './pages/user/products-search/products-search.component';
import { CartComponent } from './pages/user/cart/cart.component';
import { EditUserComponent } from './pages/addmin/addmin-user/edit-user/edit-user.component';
import { ProductsDetailadminComponent } from './pages/addmin/products-detailadmin/products-detailadmin.component';
import { AdminOrderComponent } from './pages/addmin/order-admin/admin-order/admin-order.component';
import { DashboardComponent } from './pages/addmin/admin-dashboard/dashboard/dashboard.component';

const routes: Routes = [ 
  {
    path: '', component: LayoutUserComponent, children: [
      { path: '', component: HomepagesComponent },
      { path: 'pages-detail/:id', component: PagesDetailComponent },
      { path: 'category-detail/:id', component: CategoryDetailComponent },
      { path: 'search', component: ProductsSearchComponent },
      { path: 'cart', component: CartComponent },

    ]
  },
  {
    path: 'admin', component: LayoutAdminComponent, children: [
      { path: 'category', component: CategoryListComponent },
      { path: 'category/add', component: CategoryAddComponent },
      { path: 'category/edit/:id', component: CategoryEditComponent },
      { path: 'products', component: ListComponent },
      { path: 'products/add', component: AddComponent },
      { path: 'products/edit/:id', component: EditComponent },
      { path: 'user', component: ListUserComponent },
      { path: 'user/:id/edit', component: EditUserComponent },
      { path: "products/:id", component:  ProductsDetailadminComponent},
      { path: "dashboard", component: DashboardComponent },
      { path: "order", component: AdminOrderComponent }

    ]
  },
  { path: 'sigup', component: SigupComponent },
  { path: 'login', component: SiginComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
