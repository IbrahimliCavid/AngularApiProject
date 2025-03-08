import { ListProductImages } from "./list-product-images";

export class ListProduct {
    id : string;
    name : string;
    stock : number;
    price : number;
    createdDate : Date;
    lastUpdateDate : Date; 
    productImageFiles? : ListProductImages[];
    imagePath  :string
}
