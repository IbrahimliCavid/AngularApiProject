import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BasketsModule,
    HomeModule,
    ProductsModule
  ]
})
export class ComponentsModule { }
