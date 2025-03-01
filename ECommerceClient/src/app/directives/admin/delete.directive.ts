import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2,  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer : Renderer2,
    private httpClientService : HttpClientService,
    private alertifyService : AlertifyService,
    private dialogService: DialogService
  ) {
      const img = _renderer.createElement("img");
      img.setAttribute("src", "../../../../../assets/btnDelete.png");
      img.setAttribute("style", "cursor:pointer");
      img.width = 20;
      _renderer.appendChild(element.nativeElement, img)

   }

   @Input() id : string;
   @Input() options :{controller : string};
   @Output() callBack : EventEmitter<any> = new EventEmitter();

   @HostListener("click")
  async onClick(){
    this.dialogService.openDialog({
      coponentType : DeleteDialogComponent,
      data : DeleteState.Yes,
      afterClosed : async ()=>{
        const td : HTMLTableCellElement = this.element.nativeElement;
        await this.httpClientService.delete({
          controller : this.options.controller
        }, this.id).subscribe(data=>{
          $(td.parentElement).fadeOut(700, ()=>{
            this.callBack.emit();
            this.alertifyService.message("Success deleted",{
              messageType: MessageType.Success,
              dismissOther: true,
              position : Position.TopLeft 
            })
          });
        },  (errorResponse : HttpErrorResponse)=>{
          this.alertifyService.message("Unexpected error. Data was not deleted. Please try again!",{
            messageType: MessageType.Error,
            dismissOther: true,
            position : Position.TopLeft 
          })
        })
        
      }
    })
   
   }

}