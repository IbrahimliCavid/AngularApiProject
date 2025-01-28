import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create-product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService) {
    super(spinner)
  }
  ngOnInit(): void {
  }

  @Output() createdProduct : EventEmitter<CreateProduct> = new EventEmitter();
  @Output() fileUploadOptions : Partial<FileUploadOptions> = {
    controller : "products",
    action : "upload",
    explanation : "Photo upload",
    isAdminPage : true,
    accept  : ".png, .jpg, .jpeg"
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallNewtonCradle)

    const product: CreateProduct = new CreateProduct();
    product.name = name.value;
    product.stock = parseInt(stock.value);
    product.price = parseFloat(price.value);

    this.productService.create(product, () => {
      this.hideSpinner(SpinnerType.BallNewtonCradle)
      this.alertify.message("Product success added", {
        messageType: MessageType.Success,
        position: Position.TopLeft,
        dismissOther: true
      });
      this.createdProduct.emit(product);
    }, (errorMessage)=>{
      this.alertify.message(errorMessage, {
        messageType: MessageType.Error,
        position : Position.TopRight,
        dismissOther : true
      })
    })
  }
}
