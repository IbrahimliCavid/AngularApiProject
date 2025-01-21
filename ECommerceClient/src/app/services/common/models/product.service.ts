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
    // },(errorResponse : HttpErrorResponse) =>{
    //    const _error : Array<{key : string, value : Array<string>}> = errorResponse.error;
    //    let message = "";
    //    _error.forEach((values, index) => {
    //     values.value.forEach((_value, _index) => {
    //       message+= `${_value}<br>`
    //     }) 
    //    });
    //    errorCallback(message);
    });

  }
}
