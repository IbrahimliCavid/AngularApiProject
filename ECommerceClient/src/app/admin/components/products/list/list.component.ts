import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent  implements OnInit{

constructor(spinner : NgxSpinnerService, private productService : ProductService, private alertify : AlertifyService) {
  super(spinner)
}

displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate', 'lastUpdateDate'];
dataSource : MatTableDataSource<ListProduct> = null;
@ViewChild(MatPaginator) paginator: MatPaginator;

async ngOnInit() {
  this.showSpinner(SpinnerType.BallFussion);
  const allProducts : ListProduct[] =  await this.productService.read(()=> this.hideSpinner(SpinnerType.BallFussion), 
  errorMessage => this.alertify.message(errorMessage,{
    dismissOther  : true,
    position : Position.TopLeft,
    messageType : MessageType.Error
  }))

  this.dataSource = new MatTableDataSource<ListProduct>(allProducts)
}
}
