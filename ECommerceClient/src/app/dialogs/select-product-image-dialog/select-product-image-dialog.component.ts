import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { ListProductImages } from 'src/app/contracts/list-product-images';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
declare var $ : any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

 
  constructor(
    dialogref : MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : SelectProductImageState | string,
    private productService : ProductService,
    private spinner : NgxSpinnerService,
    private dialogService : DialogService
     
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
    images : ListProductImages[];
    
    async ngOnInit() {
      this.spinner.show(SpinnerType.BallFussion)
     this.images = await this.productService.readImages(this.data as string, ()=> this.spinner.hide(SpinnerType.BallFussion));
    }
    async deleteImage(imageId : string, event : any){
     this.dialogService.openDialog({
      coponentType: DeleteDialogComponent,
      data : DeleteState.Yes,
      afterClosed:async ()=>{
        this.spinner.show(SpinnerType.BallFussion)
        await this.productService.deleteImage(this.data as string, imageId, ()=>{
         this.spinner.hide(SpinnerType.BallFussion);
      var card = $(event.srcElement).parent().parent().parent();
      card.fadeOut(500);
        })
      }
     })
  
    }
}

export enum SelectProductImageState{
  Close
}
