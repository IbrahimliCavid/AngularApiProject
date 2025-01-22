import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create-product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private clientService: HttpClientService) { }
  create(product : CreateProduct, successCallBack? : any, errorCallback? : any){
    this.clientService.post({
      controller: "products"
    }, product).subscribe(result=>{
      successCallBack();
    },(errorResponse : HttpErrorResponse) =>{
       const _error : Array<{key : string, value : Array<string>}> = errorResponse.error;
       if(Array  .isArray(_error))
     {
      let message = "";
      _error.forEach((v, index) => {
       v.value.forEach((_v, _index) => {
         message+= `${_v}<br>`
       }) 
      });
      errorCallback(message);

     }
      
    });

  }
}
