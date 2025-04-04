import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';



@NgModule({
  declarations: [
  DeleteDialogComponent,
  SelectProductImageDialogComponent,
  BasketItemRemoveDialogComponent,
  ShoppingCompleteDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatCardModule, MatButtonModule,
    FileUploadModule,
   FormsModule,
    
  ]
})
export class DialogModule { }
