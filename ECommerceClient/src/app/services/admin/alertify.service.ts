import { Injectable } from '@angular/core';
declare var alertify : any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  // message(message: string, messageType : MessageType, position:Position, delay: number = 3, dismissOther: boolean=false){
    message(message: string, options: Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
   const msg = alertify[options.messageType](message);
   if(options.dismissOther)
    msg.dismissOthers();

  }
  dismiss(){
    alertify.dismissAll();
  }
}

export enum MessageType{
  Error = "error",
  Success = "success",
  Message = "message",
  Notify = "notify",
  Warning = "warning"
}

export enum Position{
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right"
}

export class AlertifyOptions{
  messageType : MessageType = MessageType.Error;
  position: Position = Position.TopLeft;
  delay : Number = 3;
  dismissOther : boolean = false;
}
