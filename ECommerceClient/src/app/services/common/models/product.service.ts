import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create-product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from 'src/app/contracts/list-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private clientService: HttpClientService) { }
  create(product : CreateProduct, successCallBack? : ()=>void, errorCallback? : (errorMessage : string)=> void){
    this.clientService.post({
      controller: "products"
    }, product).subscribe(result=>{
      successCallBack();
    },(errorResponse : HttpErrorResponse) =>{
       const _error : Array<{key: string, value : Array<string>}> = errorResponse.error;
      let message = "";
      _error.forEach((v) => {
       v.value.forEach((_v) => {
         message+= `${_v}<br>`
       }) 
      });
      errorCallback(message);
      
    });

  }

   async read(page: Number = 0, size : Number = 5,successCallBack? : ()=>void, errorCallBack? : (errorMessage : string)=> void) : Promise<{totalCount : Number, products :ListProduct[]}>{
   const promiseData : Promise<{totalCount : Number, products :ListProduct[]}> = this.clientService.get<{totalCount : Number, products :ListProduct[]}>({
    controller : "products",
    queryString : `page=${page}&size${size}`
    }).toPromise() ;

    promiseData.then(d=>successCallBack()) //Success
    .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message)) //Error

    return await promiseData;
  }
}
