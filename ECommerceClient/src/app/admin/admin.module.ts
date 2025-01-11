import { CUSTOM_ELEMENTS_SCHEMA, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { CopmonentsModule } from './copmonents/copmonents.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CopmonentsModule
  ],
  exports:[
    LayoutModule
  ]
})
export class AdminModule { }
