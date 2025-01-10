import { CUSTOM_ELEMENTS_SCHEMA, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports:[
    LayoutModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
