import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/copmonents/dashboard/dashboard.component';
import { HomeComponent } from './ui/copmonents/home/home.component';

const routes: Routes = [
  //Admin layout
  
  {path:"admin", component:LayoutComponent, children:[
    {path:"", component:DashboardComponent},
    {path:"products", loadChildren: ()=>import("./admin/copmonents/products/products.module").then(
      module => module.ProductsModule)},
    {path:"customers", loadChildren: ()=>import("./admin/copmonents/customers/customers.module").then(
      module => module.CustomersModule)},
    {path:"orders", loadChildren: ()=>import("./admin/copmonents/orders/orders.module").then(
        module => module.OrdersModule)}    
  ]},
  //Ui
  {path:"", component:HomeComponent},
  {path:"baskets", loadChildren:()=>import("./ui/copmonents/baskets/baskets.module").then(
    module => module.BasketsModule)},
  {path:"products", loadChildren:()=>import("./ui/copmonents/products/products.module").then(
    module => module.ProductsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
