import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ], exports:[
    LayoutComponent
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
