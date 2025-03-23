import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListOrder } from 'src/app/contracts/order/list-order';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
constructor(
  spinner : NgxSpinnerService,
   private orderService : OrderService, 
   private alertify : AlertifyService) {
  super(spinner)
}

displayedColumns: string[] = ['orderCode', 'username', 'totalPrice', 'createdDate', 'delete'];
dataSource : MatTableDataSource<ListOrder> = null;
@ViewChild(MatPaginator) paginator: MatPaginator;

async getOrders(){
  this.showSpinner(SpinnerType.BallFussion);
  const allOrders : {totalCount : number, orders :ListOrder[]} =  await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,()=> this.hideSpinner(SpinnerType.BallFussion), 
  errorMessage => this.alertify.message(errorMessage,{
    dismissOther  : true,
    position : Position.TopLeft,
    messageType : MessageType.Error
  }))

  debugger
  this.dataSource = new MatTableDataSource<ListOrder>(allOrders.orders);
  this.paginator.length =allOrders.totalCount;
  
  
  debugger
}
async ngOnInit() {
 await this.getOrders();
}
async pageChanged(){
 await this.getOrders();
}

}
