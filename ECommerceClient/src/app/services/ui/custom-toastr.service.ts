import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }

  message(message : string, title: string, options: Partial<ToastrOptions>){
    this.toastr.clear();
       this.toastr[options.messageType](message, title, {
        positionClass: options.position,
       });
      
  }    
}
export class ToastrOptions{
  messageType: ToastrMessageType = ToastrMessageType.Info;
  position: ToastrPosition = ToastrPosition.TopLeft;
}
export enum ToastrMessageType{
Success = "success",
Error = "error",
Info = "info",
Warning = "warning"
}

export enum ToastrPosition{
  TopRight = "toast-top-right",
  TopLeft = "toast-top-left",
  BottomRight = "toast-bottom-right",
  BottomLeft ="toast-bottom-left"
}
