import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private clientService: HttpClientService) { }
  create(product : CreateProduct, successCallBack? : any){
    this.clientService.post({
      controller: "products"
    }, product).subscribe(result=>{
      successCallBack();
    })

  }
}
