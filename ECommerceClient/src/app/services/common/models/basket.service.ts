import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { CreateBasketItem } from 'src/app/contracts/basket/create-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService : HttpClientService) { }

 async get(): Promise<ListBasketItem[]>{
    const observable : Observable<ListBasketItem[]> = this.httpClientService.get({
      controller: "baskets"
    })

   return await firstValueFrom(observable)
  }

  async create(basketItem : CreateBasketItem) : Promise<void>{
  const observable : Observable<any> =  this.httpClientService.post({
      controller : "baskets"
    },basketItem );

     await firstValueFrom(observable)
  }

  async update(basketItem : UpdateBasketItem) : Promise<void>{
    const observable : Observable<any> = this.httpClientService.put({
      controller : "baskets"
    }, basketItem);

    await firstValueFrom(observable)
  }

  async delete(basketItemId : string) : Promise<void>{
    const observabe : Observable<any> = this.httpClientService.delete({
      controller:"baskets"
    }, basketItemId);

    await firstValueFrom(observabe)
  }
}
