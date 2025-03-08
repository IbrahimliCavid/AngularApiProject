import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create-product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from 'src/app/contracts/list-product';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProductImages } from 'src/app/contracts/list-product-images';

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
    },(errorResponse : HttpErrorResponse)=>{
      const errorMessages: {key: string, value : Array<String>} = errorResponse.error.errors;
      let message = "";
      Object.entries(errorMessages).forEach(([key, value]) => {
        
       message += `${key} - ${value}<br>`
      });
   errorCallback(message);

    });

  }

   async read(page: Number = 0, size : Number = 5,successCallBack? : ()=>void, errorCallBack? : (errorMessage : string)=> void) : Promise<{totalCount : number, products :ListProduct[]}>{
   const promiseData : Promise<{totalCount : number, products :ListProduct[]}> = this.clientService.get<{totalCount : number, products :ListProduct[]}>({
    controller : "products",
    queryString : `page=${page}&size=${size}`
    }).toPromise() ;

    promiseData.then(d=>successCallBack()) //Success
    .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message)) //Error

    return await promiseData;
  }

  async delete(id : string){
    const deleteObservable : Observable<any>= this.clientService.delete<any>({
      controller: "products"
    }, id)

   await firstValueFrom(deleteObservable)
  }

  async readImages(id : string, successCallBack? : ()=> void) : Promise<ListProductImages[]>{
    
  const getObservable : Observable<ListProductImages[]>=  this.clientService.get<ListProductImages[]>({
      action : "GetProductImages",
      controller : "products"
    }, id);
 const images : ListProductImages[] = await firstValueFrom(getObservable);
successCallBack();
  return  images;
  }

  async deleteImage(id:string, imageId : string, successCallBack? : ()=> void){
  const deleteObservabele =  this.clientService.delete({
      action: "DeleteProductImage",
      controller: "products",
      queryString : `imageId=${imageId}`
    }, id);
     await firstValueFrom(deleteObservabele);
     successCallBack();
  }

  async changeShowCaseImage(imageId : string, productId : string, successCallBack? :()=> void) : Promise<void>{
    const observable = this.clientService.get({
      controller : "products",
      action : "ChangeShowcaseImage",
      queryString : `imageId=${imageId}&productId=${productId}`
     },)

     await firstValueFrom(observable);
     successCallBack();
  }
}
