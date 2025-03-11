import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';

declare var $:any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
 constructor( spinner : NgxSpinnerService, private basketService : BasketService) {
   super(spinner)
  }
  basketItems : ListBasketItem[];
  async ngOnInit() {
     this.showSpinner(SpinnerType.BallFussion);
     this.basketItems = await this.basketService.get();
     this.hideSpinner(SpinnerType.BallFussion);
  }

 async changeQuantity(object : any){
  this.showSpinner(SpinnerType.BallFussion);
   const basketItemId : string = object.target.attributes["id"].value;
   const quantity : number = object.target.value;

   var basketItem : UpdateBasketItem = new UpdateBasketItem();
   basketItem.basketItemId = basketItemId;
   basketItem.quantity = quantity;

   await this.basketService.update(basketItem);
   this.hideSpinner(SpinnerType.BallFussion);
  }

 async removeBasketItem(id : string){
  this.showSpinner(SpinnerType.BallFussion);
  await this.basketService.delete(id);
  $("." + id).fadeOut(1000, ()=>{this.hideSpinner(SpinnerType.BallFussion);})
  }


}
