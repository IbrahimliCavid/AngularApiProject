import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2,  } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer : Renderer2,
    private productService : ProductService
  ) {
      const img = _renderer.createElement("img");
      img.setAttribute("src", "../../../../../assets/btnDelete.png");
      img.setAttribute("style", "cursor:pointer");
      img.width = 20;
      _renderer.appendChild(element.nativeElement, img)

   }

   @Input() id : string;
@Output() callBack : EventEmitter<any> = new EventEmitter ();

   @HostListener("click")
  async onClick(){
    const td : HTMLTableCellElement = this.element.nativeElement;
   await this.productService.delete(this.id)
    $(td.parentElement).fadeOut(800, ()=>{
      this.callBack.emit();
    });
   }
   
}
