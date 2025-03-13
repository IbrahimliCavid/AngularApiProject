import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from '../../../services/common/models/order.service';
import { CreateOrder } from '../../../contracts/order/create-order';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import {  ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastr: CustomToastrService,
    private router: Router,
    private dialogService : DialogService) {
    super(spinner)
  }
  basketItems: ListBasketItem[];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallFussion);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallFussion);
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallFussion);
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;

    var basketItem: UpdateBasketItem = new UpdateBasketItem();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;

    await this.basketService.update(basketItem);
    this.hideSpinner(SpinnerType.BallFussion);
  }

   removeBasketItem(id: string) {
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      coponentType : BasketItemRemoveDialogComponent,
      data : BasketItemDeleteState.Yes,
      afterClosed :async ()=>{
        this.showSpinner(SpinnerType.BallFussion);
        await this.basketService.delete(id);
        $("." + id).fadeOut(1000, () => { this.hideSpinner(SpinnerType.BallFussion); });
        $("#basketModal").modal("show");
      }
    })
   

    
  }

  async shoppingComplete() {
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      coponentType : ShoppingCompleteDialogComponent,
      data : ShoppingCompleteState,
      afterClosed : async ()=>{
        this.showSpinner(SpinnerType.BallFussion);
        const order: CreateOrder = new CreateOrder();
        order.address = "Yashildara";
        order.description = "New order";
        await this.orderService.create(order);
    
        this.hideSpinner(SpinnerType.BallFussion);
        this.toastr.message("Order created successfully", "Success", {
          position: ToastrPosition.TopLeft,
          messageType: ToastrMessageType.Info
        });
    
        this.router.navigate(["/"]);
      }
    })
   
  }
}
