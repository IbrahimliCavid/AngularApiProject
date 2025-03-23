import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from '../../../contracts/order/create-order';
import { Observable, firstValueFrom } from 'rxjs';
import { ListOrder } from 'src/app/contracts/order/list-order';

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

  async getAllOrders(page : number = 0, size : number = 5, successCallBack? : ()=>void, errorCallBack? : (errorMessage : string)=> void) : Promise<{totalCount : number, orders :ListOrder[]}>{
    const observable : Observable<{totalCount : number, orders :ListOrder[]}> = this.httpClientService.get({
       controller: "orders",
       queryString : `page=${page}&size=${size}`
    },);
 
     const promiseData = firstValueFrom(observable);

     promiseData.then(value => successCallBack())
     .catch(error => errorCallBack(error))

   return await promiseData;
   }
}
