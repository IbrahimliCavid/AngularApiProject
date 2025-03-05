import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent  implements OnInit{

constructor(
  spinner : NgxSpinnerService,
   private productService : ProductService, 
   private alertify : AlertifyService,
  private dialogService:DialogService) {
  super(spinner)
}

displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate', 'lastUpdateDate', 'uploadPhoto', 'edit', 'delete'];
dataSource : MatTableDataSource<ListProduct> = null;
@ViewChild(MatPaginator) paginator: MatPaginator;

async getProducts(){
  this.showSpinner(SpinnerType.BallFussion);
  const allProducts : {totalCount : number, products :ListProduct[]} =  await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,()=> this.hideSpinner(SpinnerType.BallFussion), 
  errorMessage => this.alertify.message(errorMessage,{
    dismissOther  : true,
    position : Position.TopLeft,
    messageType : MessageType.Error
  }))

  this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);
  this.paginator.length =allProducts.totalCount;
  
  
  
}
async ngOnInit() {
 await this.getProducts();
}
async pageChanged(){
 await this.getProducts();
}

options = {
  controller : "products",
}
uploadPhoto(id : string ){
this.dialogService.openDialog(
  {
    coponentType : SelectProductImageDialogComponent,
    data : id,
    options:{
      width : "70%"
    }
  }
)
}
}
