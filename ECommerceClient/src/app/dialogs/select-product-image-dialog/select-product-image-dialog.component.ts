import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {

 
  constructor(
    dialogref : MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : SelectProductImageState | string

  ) {
    super(dialogref); }
   @Output() options : Partial<FileUploadOptions> = {
      accept : ".jpg, .jpeg, .png, .gif",
      action : "upload",
      controller : "products",
      explanation : "Upload product photo...",
      isAdminPage : true,
      queryString : `id=${this.data}`
    }
}

export enum SelectProductImageState{
  Close
}
