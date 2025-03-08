import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseStorageUrl } from 'src/app/contracts/base-storage-url';
import { ListProduct } from 'src/app/contracts/list-product';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private productService : ProductService, private activatedRoute : ActivatedRoute, private fileService : FileService){

  }

  currentPageNo : number;
  totalProductCount : number;
  totalPageCount : number;
  pageSize : number = 8;
  pageList : number[] = [];
  products : ListProduct[];
  baseUrl : BaseStorageUrl;
   async ngOnInit() {

    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.activatedRoute.params.subscribe(async params =>{
      
      this.currentPageNo = parseInt(params["pageNo"] ?? 1)

      var data : {totalCount : number, products:ListProduct[]}= await this.productService.read(this.currentPageNo -1, this.pageSize, ()=>{

      }, errorMessage=>{
         
      });
       
      this.products = data.products;
      this.products = this.products.map<ListProduct>( p =>{
        const listProduct : ListProduct ={
              id : p.id,
              name : p.name,
              price : p.price,
              stock : p.stock,
              lastUpdateDate : p.lastUpdateDate,
              createdDate : p.createdDate,
              imagePath :  `${this.baseUrl.url}/${p.productImageFiles.length ? p.productImageFiles?.find(p=>p.showcase).path : ""}`,
              productImageFiles : p.productImageFiles
        };
        return listProduct;
      })
 
      
    
      this.totalProductCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

     
       if (this.totalPageCount <= 7) 
          for (let i = 1; i <= this.totalPageCount; i++) {
              this.pageList.push(i);}
             else if(this.currentPageNo - 3 <= 0)
                for (let i = 1; i <= 7; i++) {
                   this.pageList.push(i);
                }
        else if(this.currentPageNo + 3 >= this.totalPageCount)
          for (let i = this.totalPageCount-6; i <= this.totalPageCount; i++) {
            this.pageList.push(i);
         }
         else
         for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
          this.pageList.push(i);
          }
          
    });

   
  }

}
