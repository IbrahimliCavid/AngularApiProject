import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

   constructor( spinner : NgxSpinnerService,private httpClientService : HttpClientService) {
     super(spinner)
    }
    ngOnInit(): void {
       this.showSpinner(SpinnerType.BallFussion);
       this.httpClientService.get<Product>({
        controller: "products"
       }).subscribe(data=>console.log(data))

      //  this.httpClientService.post({
      //   controller: "products"
      //  }, {
      //   name : "Hp",
      //   stock : 4,
      //   price : 1200
      //  }).subscribe()

      // this.httpClientService.put({
      //   controller : "products"
      // }, {
      //   id : "e069e414-6ea2-41f6-96c0-020322b60642",
      //   name : "Hp EliteBook",
      //   stock : 19,
      //   price : 1700
      // }).subscribe()

      // this.httpClientService.delete({
      //   controller: "products"
      // }, "e069e414-6ea2-41f6-96c0-020322b60642").subscribe()
    }
}
