import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from '../../../contracts/order/create-order';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService : HttpClientService) { }

 async create( order: CreateOrder) : Promise<void>{
   const observable : Observable<any> = this.httpClientService.post({
      controller: "orders"
   }, order);

   await firstValueFrom(observable);
  }
}
