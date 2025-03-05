import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  //Admin layout
  
  {path:"admin", component:LayoutComponent, children:[
    {path:"", component:DashboardComponent},
    {path:"products", loadChildren: ()=>import("./admin/components/products/products.module").then(
      module => module.ProductsModule),  canActivate: [AuthGuard]},
    {path:"customers", loadChildren: ()=>import("./admin/components/customers/customers.module").then(
      module => module.CustomersModule), canActivate: [AuthGuard]},
    {path:"orders", loadChildren: ()=>import("./admin/components/orders/orders.module").then(
        module => module.OrdersModule), canActivate: [AuthGuard]}    
  ], canActivate: [AuthGuard]},
  //Ui
  {path:"", component:HomeComponent},
  {path:"baskets", loadChildren:()=>import("./ui/components/baskets/baskets.module").then(
    module => module.BasketsModule)},
  {path:"products", loadChildren:()=>import("./ui/components/products/products.module").then(
    module => module.ProductsModule)},
    {path:"products/:pageNo", loadChildren:()=>import("./ui/components/products/products.module").then(
      module => module.ProductsModule)},
    {path:"register", loadChildren:()=>import("./ui/components/register/register.module").then(
      module => module.RegisterModule)},
      {path:"login", loadChildren:()=>import("./ui/components/login/login.module").then(
        module => module.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
